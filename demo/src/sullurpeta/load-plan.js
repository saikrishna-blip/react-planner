// Builds the Sullurpeta starter plan into a react-planner state.
import { fromJS } from 'immutable';
import { ReactPlannerClasses } from 'react-planner';
import PLAN from './plan-data';

const { Project, Line, Hole, Layer, Item } = ReactPlannerClasses;

export const LOAD_SULLURPETA_PLAN = 'LOAD_SULLURPETA_PLAN';
export const loadSullurpetaPlan = () => ({ type: LOAD_SULLURPETA_PLAN });

const FT = 30.48;            // cm per foot (react-planner works in cm)
const IN = 2.54;             // cm per inch
const OX = 150, OY = 150;    // where the plot's road-left corner sits on the canvas (cm)
const LAYER = 'layer-1';
const EPS = 1e-6;

const cx = x => OX + x * FT;
const cy = y => OY + y * FT;

// merge overlapping/touching intervals
function mergeIntervals(list) {
  let sorted = list.slice().sort((a, b) => a[0] - b[0]);
  let out = [];
  sorted.forEach(([a, b]) => {
    let last = out[out.length - 1];
    if (last && a <= last[1] + EPS) last[1] = Math.max(last[1], b);
    else out.push([a, b]);
  });
  return out;
}

// Collect wall pieces (in feet) from the room rectangles: merge overlaps, split at every
// junction, and mark a piece external when either side of it is outside the house.
function wallSegments(rooms) {
  let walled = rooms.filter(r => !r.open);
  let H = {}, V = {};
  const add = (map, key, a, b) => { (map[key] = map[key] || []).push([Math.min(a, b), Math.max(a, b)]); };
  walled.forEach(r => {
    add(H, r.y, r.x, r.x + r.w);
    add(H, r.y + r.d, r.x, r.x + r.w);
    add(V, r.x, r.y, r.y + r.d);
    add(V, r.x + r.w, r.y, r.y + r.d);
  });
  let hs = [], vs = [];
  Object.keys(H).forEach(k => mergeIntervals(H[k]).forEach(([a, b]) => hs.push({ y: parseFloat(k), a, b })));
  Object.keys(V).forEach(k => mergeIntervals(V[k]).forEach(([a, b]) => vs.push({ x: parseFloat(k), a, b })));

  const inside = (x, y) => walled.some(r => x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.d);
  const split = (a, b, cuts) => {
    let pts = [a, b].concat(cuts.filter(c => c > a + EPS && c < b - EPS)).sort((m, n) => m - n);
    let out = [];
    for (let i = 0; i < pts.length - 1; i++) if (pts[i + 1] - pts[i] > EPS) out.push([pts[i], pts[i + 1]]);
    return out;
  };

  let segs = [];
  hs.forEach(h => {
    let cuts = vs.filter(v => v.a <= h.y + EPS && v.b >= h.y - EPS).map(v => v.x);
    split(h.a, h.b, cuts).forEach(([a, b]) => {
      let m = (a + b) / 2;
      let ext = !inside(m, h.y + 0.2) || !inside(m, h.y - 0.2);
      segs.push({ x0: a, y0: h.y, x1: b, y1: h.y, ext });
    });
  });
  vs.forEach(v => {
    let cuts = hs.filter(h => h.a <= v.x + EPS && h.b >= v.x - EPS).map(h => h.y);
    split(v.a, v.b, cuts).forEach(([a, b]) => {
      let m = (a + b) / 2;
      let ext = !inside(v.x + 0.2, m) || !inside(v.x - 0.2, m);
      segs.push({ x0: v.x, y0: a, x1: v.x, y1: b, ext });
    });
  });
  return segs;
}

const wallProps = spec => fromJS({
  thickness: { length: spec.thickness * IN },
  height: { length: spec.height * IN },
  textureA: 'painted',
  textureB: 'painted'
});

const lenProp = cm => fromJS({ length: cm });

// find the wall line that contains point (x,y) in cm; return {lineID, offset}
function findLine(state, px, py) {
  let layer = state.getIn(['scene', 'layers', LAYER]);
  let found = null;
  layer.lines.forEach(line => {
    if (found) return;
    let v0 = layer.vertices.get(line.vertices.get(0));
    let v1 = layer.vertices.get(line.vertices.get(1));
    // same ordering rule react-planner uses when drawing holes
    let a = v0, b = v1;
    if (v0.x > v1.x) { a = v1; b = v0; }
    let len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len < EPS) return;
    let t = ((px - a.x) * (b.x - a.x) + (py - a.y) * (b.y - a.y)) / (len * len);
    let dx = a.x + t * (b.x - a.x) - px, dy = a.y + t * (b.y - a.y) - py;
    if (t > 0 && t < 1 && Math.hypot(dx, dy) < 1) found = { lineID: line.id, offset: t };
  });
  return found;
}

function pointInRoom(r, x, y) {
  return x > cx(r.x) && x < cx(r.x + r.w) && y > cy(r.y) && y < cy(r.y + r.d);
}

export function buildPlan(plannerState) {
  const W = PLAN.plot.width, D = PLAN.plot.depth;

  // fresh scene (keeps the catalog)
  let state = Project.loadProject(plannerState, {
    unit: 'cm',
    width: Math.ceil(cx(W) + OX),
    height: Math.ceil(cy(D) + OY),
    layers: { [LAYER]: { id: LAYER, name: 'Ground floor', altitude: 0, order: 0, opacity: 1, visible: true } }
  }).updatedState;

  // 1. compound wall around the plot
  let compound = wallProps(PLAN.wall.compound);
  [[0, 0, W, 0], [W, 0, W, D], [W, D, 0, D], [0, D, 0, 0]].forEach(([a, b, c, d]) => {
    state = Line.createAvoidingIntersections(state, LAYER, 'wall', cx(a), cy(b), cx(c), cy(d), compound).updatedState;
  });

  // 2. house walls from the rooms
  const inZone = (s, z) => Math.min(s.x0, s.x1) >= z.x0 - EPS && Math.max(s.x0, s.x1) <= z.x1 + EPS &&
                          Math.min(s.y0, s.y1) >= z.y0 - EPS && Math.max(s.y0, s.y1) <= z.y1 + EPS;
  wallSegments(PLAN.rooms).forEach(s => {
    let spec = Object.assign({}, s.ext ? PLAN.wall.external : PLAN.wall.internal);
    let zone = (PLAN.wallHeights || []).find(z => inZone(s, z));
    if (zone) spec.height = zone.height;
    let props = wallProps(spec);
    state = Line.create(state, LAYER, 'wall', cx(s.x0), cy(s.y0), cx(s.x1), cy(s.y1), props).updatedState;
  });

  // 2b. low walls (planters)
  (PLAN.lowWalls || []).forEach(r => {
    let props = wallProps({ thickness: r.thickness, height: r.height });
    [[r.x, r.y, r.x + r.w, r.y], [r.x + r.w, r.y, r.x + r.w, r.y + r.d],
     [r.x + r.w, r.y + r.d, r.x, r.y + r.d], [r.x, r.y + r.d, r.x, r.y]].forEach(([a, b, c, d]) => {
      state = Line.createAvoidingIntersections(state, LAYER, 'wall', cx(a), cy(b), cx(c), cy(d), props).updatedState;
    });
  });

  // 3. doors, windows, openings, gate
  PLAN.doors.forEach(d => {
    let mx = d.wall === 'h' ? d.x + d.w / 2 : d.x;
    let my = d.wall === 'h' ? d.y : d.y + d.w / 2;
    let hit = findLine(state, cx(mx), cy(my));
    if (!hit) { console.warn('No wall found for', d.name); return; }
    if (!state.catalog.elements.has(d.type)) { console.warn('Unknown type', d.type, 'for', d.name); return; }
    let props = fromJS({}).set('width', lenProp(d.w * FT));
    if (d.h) props = props.set('height', lenProp(d.h * FT));
    if (d.alt !== undefined) props = props.set('altitude', lenProp(d.alt * FT));
    state = Hole.create(state, LAYER, d.type, hit.lineID, hit.offset, props).updatedState;
  });

  // 3b. items (pillar, furniture)
  (PLAN.items || []).forEach(it => {
    if (!state.catalog.elements.has(it.type)) { console.warn('Unknown item', it.type); return; }
    let res = Item.create(state, LAYER, it.type, cx(it.x), cy(it.y), 0, 0, it.rotation || 0);
    state = res.updatedState;
    let path = ['scene', 'layers', LAYER, 'items', res.item.id];
    state = state.setIn(path.concat('name'), it.name || it.type);
    let props = state.getIn(path.concat('properties'));
    if (it.w && props.has('width')) props = props.set('width', lenProp(it.w * FT));
    if (it.d && props.has('depth')) props = props.set('depth', lenProp(it.d * FT));
    if (it.h && props.has('height')) props = props.set('height', lenProp(it.h * FT));
    state = state.setIn(path.concat('properties'), props);
  });

  // 4. detect rooms (areas) and name them
  state = Layer.detectAndUpdateAreas(state, LAYER).updatedState;
  let layer = state.getIn(['scene', 'layers', LAYER]);
  layer.areas.forEach(area => {
    let pts = area.vertices.map(id => layer.vertices.get(id));
    let ax = pts.reduce((s, p) => s + p.x, 0) / pts.size;
    let ay = pts.reduce((s, p) => s + p.y, 0) / pts.size;
    let named = PLAN.rooms.filter(r => !r.open).concat(PLAN.lowWalls || []);
    let room = area.holes.size ? null : named.find(r => pointInRoom(r, ax, ay));
    let name = area.holes.size ? 'Garden / Open space' : (room ? room.name : null);
    if (name) state = state.setIn(['scene', 'layers', LAYER, 'areas', area.id, 'name'], name);
  });

  return state;
}
