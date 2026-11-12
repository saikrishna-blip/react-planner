// ============================================================
//  SULLURPETA HOUSE — starter layout (all sizes in FEET)
//  x = from LEFT plot edge (looking from the road)
//  y = from ROAD edge (front = 0, back = 60)
//  w = width (left-right), d = depth (front-back)
//  Edit these numbers, rebuild, then click "Load my plot" in the toolbar.
// ============================================================

export default {
  plot: { width: 24, depth: 60 },

  // placeholder setbacks — confirm with your engineer / municipality
  setbacks: { front: 6, rear: 3, left: 3, right: 3 },

  wall: {
    external: { thickness: 9, height: 10 * 12 },   // inches: 9" brick, 10 ft high
    internal: { thickness: 4.5, height: 10 * 12 }, // inches: 4.5" partition
    compound: { thickness: 6, height: 5 * 12 }     // inches: 5 ft compound wall
  },

  // rooms with open: true get no walls
  // Layout v4 (matches reference elevation): left entrance bay recessed 4 ft under a canopy,
  // right window block projects to the front setback line and rises as a tall feature frame.
  rooms: [
    { name: 'Porch',             x: 3,  y: 6,  w: 7,  d: 4, open: true },
    { name: 'Living (window bay)', x: 10, y: 6, w: 7,  d: 4 },
    { name: 'Living Hall',       x: 3,  y: 10, w: 14, d: 9 },
    { name: 'Staircase',         x: 17, y: 6,  w: 4,  d: 12 },
    { name: 'Kitchen',           x: 3,  y: 19, w: 8,  d: 9 },
    { name: 'Dining',            x: 11, y: 19, w: 6,  d: 9 },
    { name: 'Passage',           x: 17, y: 18, w: 4,  d: 31 },
    { name: 'Bath 1',            x: 3,  y: 28, w: 5,  d: 5 },
    { name: 'Bedroom 1',         x: 8,  y: 28, w: 9,  d: 11 },
    { name: 'Bath 2',            x: 3,  y: 33, w: 5,  d: 6 },
    { name: 'Master Bedroom',    x: 3,  y: 39, w: 14, d: 10 }
  ],

  // Wall heights by zone (inches). A wall segment lying fully inside a zone gets that height.
  wallHeights: [
    { name: 'Tall feature frame (right block front)', x0: 10, y0: 6, x1: 21, y1: 6, height: 17 * 12 },
    { name: 'Feature frame return (porch side)',      x0: 10, y0: 6, x1: 10, y1: 10, height: 17 * 12 },
    { name: 'Entrance bay with parapet',              x0: 3,  y0: 10, x1: 10, y1: 10, height: 12 * 12 }
  ],

  // Doors / openings / windows / gate.
  //   wall: 'h' = front-back wall line, 'v' = side wall line
  //   x, y = START of the opening, w = width (ft); optional h = height, alt = sill height (ft)
  //   type: door | opening | window | gate | sliding-door | door-double ...
  doors: [
    // --- Entrance bay (recessed, under canopy) ---
    { name: 'Main door (wood panel)', x: 4,    y: 10, w: 3.5, wall: 'h', type: 'door' },
    { name: 'Glass side light',       x: 8,    y: 10, w: 1.5, wall: 'h', type: 'window', h: 6.5, alt: 0.5 },
    { name: 'Living-bay opening',     x: 10.5, y: 10, w: 6,   wall: 'h', type: 'opening' },
    // --- Right feature block (tall window + wood panel) ---
    { name: 'Tall feature window',    x: 12.5, y: 6,  w: 4,   wall: 'h', type: 'window', h: 9,   alt: 1 },
    { name: 'Stair tall window',      x: 17.5, y: 6,  w: 3,   wall: 'h', type: 'window', h: 9,   alt: 3 },
    { name: 'Hall-Dining',    x: 12, y: 19, w: 4,   wall: 'h', type: 'opening' },
    { name: 'Kitchen-Dining', x: 11, y: 21, w: 3,   wall: 'v', type: 'opening' },
    { name: 'Dining-Passage', x: 17, y: 20, w: 4,   wall: 'v', type: 'opening' },
    { name: 'Hall-Stair',     x: 17, y: 7, w: 3,   wall: 'v', type: 'opening' },
    { name: 'Bedroom 1',      x: 17, y: 30, w: 3,   wall: 'v', type: 'door' },
    { name: 'Bath 1',         x: 8,  y: 29, w: 2.5, wall: 'v', type: 'door' },
    { name: 'Bath 2',         x: 4,  y: 39, w: 2.5, wall: 'h', type: 'door' },
    { name: 'Master Bedroom', x: 17, y: 41, w: 3,   wall: 'v', type: 'door' },
    { name: 'Back door',      x: 18, y: 49, w: 3,   wall: 'h', type: 'door' },
    { name: 'Living window',  x: 3,  y: 12, w: 5,   wall: 'v', type: 'window' },
    { name: 'Kitchen window', x: 3,  y: 21, w: 4,   wall: 'v', type: 'window' },
    { name: 'Bath 1 vent',    x: 3,  y: 30, w: 1.5, wall: 'v', type: 'window' },
    { name: 'Bath 2 vent',    x: 3,  y: 35, w: 1.5, wall: 'v', type: 'window' },
    { name: 'Master window',  x: 3,  y: 42, w: 5,   wall: 'v', type: 'window' },
    { name: 'Master rear window', x: 7, y: 49, w: 5, wall: 'h', type: 'window' },
    { name: 'Front gate (wide, with wicket)', x: 1, y: 0, w: 9, wall: 'h', type: 'gate' }
  ],

  // Low walls (planter boxes, kerbs). height/thickness in inches.
  lowWalls: [
    { name: 'Planter', x: 11, y: 3.5, w: 10, d: 2, thickness: 4.5, height: 24 }   // raised planter at the foot of the feature block
  ],

  // Catalog items placed on the plan. Sizes in feet.
  items: [
    { name: 'Stone-clad pillar', type: 'square column', x: 10.9, y: 5.4, w: 1.8, d: 1.2, h: 17 }   // grey stone strip between door bay and window block
  ],

  // Front porch: covered by a projecting slab (canopy) from the left gate to the main door.
  porch: { x: 3, y: 6, w: 7, d: 4, note: 'Recessed entrance under projecting canopy slab' }
};
