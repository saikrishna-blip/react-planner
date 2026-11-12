// ============================================================
//  SULLURPETA HOUSE — P5 "Royal Mahal plan" (all sizes in FEET)
//  Matches exterior E3 "Royal Rajasthani Mahal".
//  x = from LEFT plot edge (looking from the road)
//  y = from ROAD edge (front = 0, back = 60)
//  w = width (left-right), d = depth (front-back)
//
//  Fixed specs carried through every version since P2:
//    plot 24 x 60 · setbacks front 6 / sides 3 / rear 3 (placeholders, confirm locally)
//    house 18 x 43 (x 3–21, y 6–49) · back garden 11 ft (y 49–60) · no front parking
//    walls 9" external / 4.5" internal / 10 ft high · compound wall 5 ft
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
    { name: 'Porch',               x: 3,  y: 6,  w: 7,  d: 4, open: true },  // under the cusped marble arch
    { name: 'Living (window bay)', x: 10, y: 6,  w: 7,  d: 4 },
    { name: 'Living Hall',         x: 3,  y: 10, w: 14, d: 9 },
    { name: 'Staircase',           x: 17, y: 6,  w: 4,  d: 12 },            // solid front wall with jharokha
    { name: 'Kitchen',             x: 3,  y: 19, w: 8,  d: 9 },
    { name: 'Dining',              x: 11, y: 19, w: 6,  d: 9 },
    { name: 'Passage',             x: 17, y: 18, w: 4,  d: 31 },
    { name: 'Bath 1',              x: 3,  y: 28, w: 5,  d: 5 },
    { name: 'Bedroom 1',           x: 8,  y: 28, w: 9,  d: 11 },
    { name: 'Bath 2',              x: 3,  y: 33, w: 5,  d: 6 },
    { name: 'Master Bedroom',      x: 3,  y: 39, w: 14, d: 10 }
  ],

  // Wall heights by zone (inches): front block wall rises into the 3 ft parapet with kangura.
  wallHeights: [
    { name: 'Front block wall + parapet', x0: 10, y0: 6, x1: 21, y1: 6, height: 13.5 * 12 },
    { name: 'Porch-side wall + parapet',  x0: 10, y0: 6, x1: 10, y1: 10, height: 13.5 * 12 }
  ],

  // Doors / openings / windows / gate.
  //   wall: 'h' = front-back wall line, 'v' = side wall line
  //   x, y = START of the opening, w = width (ft); optional h = height, alt = sill height (ft)
  doors: [
    // --- Entrance (porch under the arch) ---
    { name: 'Main door (carved teak, double)', x: 4.5, y: 10, w: 3.6, wall: 'h', type: 'door' },
    { name: 'Living-bay opening',     x: 10.5, y: 10, w: 6,   wall: 'h', type: 'opening' },
    // --- Front block ---
    { name: 'Arched living window',   x: 11.6, y: 6,  w: 3.4, wall: 'h', type: 'window', h: 6.2, alt: 2.6 },
    // staircase front (x 17–21): solid wall with a carved jharokha, NO window
    // --- Inside ---
    { name: 'Hall-Dining',    x: 12, y: 19, w: 4,   wall: 'h', type: 'opening' },
    { name: 'Kitchen-Dining', x: 11, y: 21, w: 3,   wall: 'v', type: 'opening' },
    { name: 'Dining-Passage', x: 17, y: 20, w: 4,   wall: 'v', type: 'opening' },
    { name: 'Hall-Stair',     x: 17, y: 7,  w: 3,   wall: 'v', type: 'opening' },
    { name: 'Bedroom 1',      x: 17, y: 30, w: 3,   wall: 'v', type: 'door' },
    { name: 'Bath 1',         x: 8,  y: 29, w: 2.5, wall: 'v', type: 'door' },
    { name: 'Bath 2',         x: 4,  y: 39, w: 2.5, wall: 'h', type: 'door' },
    { name: 'Master Bedroom', x: 17, y: 41, w: 3,   wall: 'v', type: 'door' },
    // --- Back ---
    { name: 'Back door',          x: 18, y: 49, w: 3, wall: 'h', type: 'door' },
    { name: 'Master rear window', x: 7,  y: 49, w: 5, wall: 'h', type: 'window' },
    // --- Left side (x = 3) ---
    { name: 'Living window',  x: 3,  y: 12, w: 5,   wall: 'v', type: 'window' },
    { name: 'Kitchen window', x: 3,  y: 21, w: 4,   wall: 'v', type: 'window' },
    { name: 'Bath 1 vent',    x: 3,  y: 30, w: 1.5, wall: 'v', type: 'window' },
    { name: 'Bath 2 vent',    x: 3,  y: 35, w: 1.5, wall: 'v', type: 'window' },
    { name: 'Master window',  x: 3,  y: 42, w: 5,   wall: 'v', type: 'window' },
    // --- Right side (x = 21): passage ventilators ---
    { name: 'Passage vent 1', x: 21, y: 22, w: 2, wall: 'v', type: 'window', h: 2, alt: 5.5 },
    { name: 'Passage vent 2', x: 21, y: 30, w: 2, wall: 'v', type: 'window', h: 2, alt: 5.5 },
    { name: 'Passage vent 3', x: 21, y: 40, w: 2, wall: 'v', type: 'window', h: 2, alt: 5.5 },
    // --- Compound ---
    { name: 'Front gate (ornamental, arched top)', x: 1.1, y: 0, w: 8.9, wall: 'h', type: 'gate' }
  ],

  // Low walls (planters, garden beds, platforms). height/thickness in inches.
  lowWalls: [
    { name: 'Front planter',       x: 12.6, y: 3.4,  w: 8.4, d: 2.1, thickness: 4.5, height: 22 },
    { name: 'Veg bed',             x: 3.2,  y: 54,   w: 5.6, d: 4.9, thickness: 4.5, height: 14 },
    { name: 'Herbs',               x: 12,   y: 54,   w: 2.4, d: 4.9, thickness: 4.5, height: 14 },
    { name: 'Wash',                x: 15.4, y: 55.3, w: 3,   d: 2,   thickness: 4.5, height: 32 }
  ],

  // Catalog items placed on the plan. Sizes in feet.
  items: [
    { name: 'Arch pilaster L',    type: 'square column', x: 3.05,  y: 5.25, w: 0.9, d: 0.5, h: 11.2 },
    { name: 'Arch pilaster R',    type: 'square column', x: 9.55,  y: 5.25, w: 0.9, d: 0.5, h: 11.2 },
    { name: 'Gate pillar L',      type: 'square column', x: 0.55,  y: 0.35, w: 1.1, d: 0.9, h: 5.6 },
    { name: 'Gate pillar R (name plate)', type: 'square column', x: 11.25, y: 0.35, w: 2.5, d: 0.9, h: 5.6 }
  ],

  // Features drawn in the 3D exterior (E3) — listed here so both stay in step.
  features: {
    porch:    'Recessed porch 7 x 4 ft under a cusped marble arch (opening 4.6 ft wide, 10.4 ft high)',
    steps:    'Marble steps x 3.4–9.2, y 4.2–5.5 (in the front setback)',
    jharokha: 'Solid carved jharokha on the staircase front, x 16.2–20.4, projects 1.35 ft, from 6 to 10.3 ft high',
    chhatris: 'Two chhatris on the parapet: over the entrance (x 6.3) and over the jharokha (x 18.5)',
    headRoom: 'Stair head room x 16.7–21.2, y 9.8–18.6 with overhead tank',
    garden:   'Back garden 24 x 11 ft: paved sit-out 18 x 4 ft, utility area, 2 raised beds, rainwater pit'
  }
};
