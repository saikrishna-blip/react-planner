// ============================================================
//  SULLURPETA HOUSE — P6 "Vastu plan, south-facing" (all sizes in FEET)
//  Furnished 3D interior: demo/interior/index.html
//  The plot faces SOUTH (road on the south, neighbour's house on the east,
//  garden on the north), so on this plan:
//    x = from the WEST plot edge (0) to the EAST edge (24)
//    y = from the ROAD / south edge (0) to the NORTH edge (60)
//  w = width (west-east), d = depth (south-north)
//
//  Fixed specs carried through every version since P2:
//    plot 24 x 60 · setbacks front 6 / sides 3 / rear 3 (placeholders, confirm locally)
//    house 18 x 43 (x 3–21, y 6–49) · back garden 11 ft (y 49–60) · no front parking
//    walls 9" external / 4.5" internal / 10 ft high · compound wall 5 ft
//
//  Vastu zoning: SW master bedroom · S main door (east of centre) + foyer · SE kitchen
//                W stairs, dining, baths · centre open · E living
//                NW bedroom 2 · N study, back door, garden · NE pooja
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
  rooms: [
    { name: 'Porch',           x: 11.5, y: 6,  w: 9.5, d: 4, open: true },  // S: covered, two round columns
    { name: 'Master Bedroom',  x: 3,    y: 6,  w: 8.5, d: 11 },             // SW: bed head to the south
    { name: 'Master Bath',     x: 3,    y: 17, w: 5,   d: 5 },              // W
    { name: 'Dressing',        x: 8,    y: 17, w: 3.5, d: 5 },
    { name: 'Foyer',           x: 11.5, y: 10, w: 3.5, d: 12 },             // S: main door east of centre
    { name: 'Kitchen',         x: 15,   y: 10, w: 6,   d: 12 },             // SE: cook facing east
    { name: 'Staircase',       x: 3,    y: 22, w: 5,   d: 12 },             // W: rises north to south
    { name: 'Living & Dining', x: 8,    y: 22, w: 13,  d: 12 },             // dining W side, living centre + E
    { name: 'Bath 2',          x: 3,    y: 34, w: 5,   d: 5 },              // W
    { name: 'Wash lobby',      x: 8,    y: 34, w: 5,   d: 5 },
    { name: 'Bedroom 2',       x: 3,    y: 39, w: 10,  d: 10 },             // NW: children / guests
    { name: 'Passage',         x: 13,   y: 34, w: 3,   d: 15 },             // N: to the back door
    { name: 'Study',           x: 16,   y: 34, w: 5,   d: 9 },              // N: desk faces east, locker opens north
    { name: 'Pooja',           x: 16,   y: 43, w: 5,   d: 6 }               // NE: idol on the east wall
  ],

  wallHeights: [],

  // Doors / openings / windows / gate.
  //   wall: 'h' = wall running west-east, 'v' = wall running south-north
  //   x, y = START of the opening, w = width (ft); optional h = height, alt = sill height (ft)
  doors: [
    // --- Entrance (south wall, east of the centre line) ---
    { name: 'Main door (teak, double)', x: 11.65, y: 10, w: 3.2, wall: 'h', type: 'door' },
    // --- Inside ---
    { name: 'Foyer-Hall',        x: 11.8,  y: 22, w: 2.9, wall: 'h', type: 'opening' },
    { name: 'Kitchen',           x: 15.5,  y: 22, w: 2.7, wall: 'h', type: 'opening' },
    { name: 'Master-Dressing',   x: 8.5,   y: 17, w: 2.5, wall: 'h', type: 'opening' },
    { name: 'Dressing-Hall',     x: 8.4,   y: 22, w: 2.6, wall: 'h', type: 'door' },
    { name: 'Master Bath',       x: 8,     y: 18.6, w: 2.4, wall: 'v', type: 'door' },
    { name: 'Hall-Stair',        x: 8,     y: 30.4, w: 3.2, wall: 'v', type: 'opening' },
    { name: 'Hall-Wash lobby',   x: 9,     y: 34, w: 3,   wall: 'h', type: 'opening' },
    { name: 'Hall-Passage',      x: 13.25, y: 34, w: 2.5, wall: 'h', type: 'opening' },
    { name: 'Lobby-Passage',     x: 13,    y: 34.5, w: 4, wall: 'v', type: 'opening' },
    { name: 'Bath 2',            x: 8,     y: 35.3, w: 2.4, wall: 'v', type: 'door' },
    { name: 'Bedroom 2',         x: 13,    y: 42.6, w: 2.7, wall: 'v', type: 'door' },
    { name: 'Study',             x: 16,    y: 40,   w: 2.7, wall: 'v', type: 'door' },
    { name: 'Pooja (jali, double)', x: 16, y: 44.5, w: 2.8, wall: 'v', type: 'door' },
    // --- Back (north) ---
    { name: 'Back door',         x: 13.25, y: 49, w: 2.5, wall: 'h', type: 'door' },
    // --- Windows: larger on the north and east, small and high on the south and west ---
    { name: 'Living window 1 (E)', x: 21, y: 23,   w: 3.6, wall: 'v', type: 'window', h: 6.1, alt: 1.5 },
    { name: 'Living window 2 (E)', x: 21, y: 29.4, w: 3.6, wall: 'v', type: 'window', h: 6.1, alt: 1.5 },
    { name: 'Kitchen window (E)',  x: 21, y: 15.2, w: 3.2, wall: 'v', type: 'window', h: 3.4, alt: 3.6 },
    { name: 'Study window (E)',    x: 21, y: 36.3, w: 4,   wall: 'v', type: 'window', h: 4.8, alt: 2.6 },
    { name: 'Pooja window (E)',    x: 21, y: 45,   w: 2,   wall: 'v', type: 'window', h: 2.4, alt: 4.6 },
    { name: 'Bedroom 2 window (N)', x: 5.5,  y: 49, w: 5,   wall: 'h', type: 'window', h: 4.8, alt: 2.6 },
    { name: 'Pooja window (N)',     x: 17.4, y: 49, w: 2.2, wall: 'h', type: 'window', h: 3.8, alt: 3.2 },
    { name: 'Kitchen vent (S)',     x: 17,   y: 10, w: 2.2, wall: 'h', type: 'window', h: 2.4, alt: 4.6 },
    { name: 'Master high window (S)', x: 5.6, y: 6, w: 3.4, wall: 'h', type: 'window', h: 2.2, alt: 4.8 },
    { name: 'Master window (W)',    x: 3, y: 9.2,  w: 2.6, wall: 'v', type: 'window', h: 4,   alt: 3 },
    { name: 'Master bath vent (W)', x: 3, y: 19,   w: 1.5, wall: 'v', type: 'window', h: 1.6, alt: 5.4 },
    { name: 'Stair window (W)',     x: 3, y: 25.5, w: 3,   wall: 'v', type: 'window', h: 3.5, alt: 4 },
    { name: 'Bath 2 vent (W)',      x: 3, y: 36,   w: 1.5, wall: 'v', type: 'window', h: 1.6, alt: 5.4 },
    { name: 'Bedroom 2 window (W)', x: 3, y: 43,   w: 3,   wall: 'v', type: 'window', h: 4,   alt: 3 },
    // --- Compound: gate in the south-east part of the front ---
    { name: 'Front gate (south-east)', x: 13, y: 0, w: 9, wall: 'h', type: 'gate' }
  ],

  // Low walls (garden beds, platforms). height/thickness in inches.
  lowWalls: [
    { name: 'Veg bed', x: 3.2,  y: 54,   w: 5.6, d: 4.9, thickness: 4.5, height: 14 },
    { name: 'Herbs',   x: 10.2, y: 54,   w: 3.2, d: 4.9, thickness: 4.5, height: 14 },
    { name: 'Wash',    x: 1.2,  y: 52.5, w: 1.4, d: 3,   thickness: 4.5, height: 32 },   // north-west
    { name: 'Tulsi',   x: 18.3, y: 53.3, w: 1.4, d: 1.4, thickness: 4.5, height: 29 }    // north-east
  ],

  // Catalog items placed on the plan. Sizes in feet.
  items: [
    { name: 'Porch column W', type: 'square column', x: 11.85, y: 5.3,  w: 0.7, d: 0.7, h: 9.6 },
    { name: 'Porch column E', type: 'square column', x: 20.55, y: 5.3,  w: 0.7, d: 0.7, h: 9.6 },
    { name: 'Gate pillar W (name plate)', type: 'square column', x: 12, y: 0.0, w: 1,   d: 0.8, h: 6 },
    { name: 'Gate pillar E',              type: 'square column', x: 22, y: 0.0, w: 1.5, d: 0.8, h: 6 }
  ],

  // Features drawn in the 3D interior — listed here so both stay in step.
  features: {
    facing:   'South-facing plot at 13°42\'02.5"N 80°02\'01.4"E; road on the south, neighbour on the east',
    porch:    'Covered porch 9.5 x 4 ft on two columns, two steps, in line with the south-east gate',
    stairs:   'Straight flight on the west wall, 15 risers, climbing north to south; head room and tank above (west)',
    centre:   'Centre of the house (Brahmasthan) left open inside the 13 x 12 ft hall',
    compound: 'Compound wall 5.5 ft on the south and west, 4.5 ft on the north and east',
    garden:   'North garden 24 x 11 ft: sit-out, 2 raised beds, tulsi and rainwater pit in the north-east, washing stone in the north-west'
  }
};
