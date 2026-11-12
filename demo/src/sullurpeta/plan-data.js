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
  // Layout v2: no front parking — house starts at the 6 ft front setback, ~11 ft back garden
  rooms: [
    { name: 'Living Hall',       x: 3,  y: 6, w: 14, d: 13 },
    { name: 'Staircase',         x: 17, y: 6, w: 4,  d: 12 },
    { name: 'Kitchen',           x: 3,  y: 19, w: 8,  d: 9 },
    { name: 'Dining',            x: 11, y: 19, w: 6,  d: 9 },
    { name: 'Passage',           x: 17, y: 18, w: 4,  d: 31 },
    { name: 'Bath 1',            x: 3,  y: 28, w: 5,  d: 5 },
    { name: 'Bedroom 1',         x: 8,  y: 28, w: 9,  d: 11 },
    { name: 'Bath 2',            x: 3,  y: 33, w: 5,  d: 6 },
    { name: 'Master Bedroom',    x: 3,  y: 39, w: 14, d: 10 }
  ],

  // Doors / openings / windows / gate.
  //   wall: 'h' = front-back wall line, 'v' = side wall line
  //   x, y = START of the opening, w = width (ft)
  //   type: door | opening | window | gate | sliding-door | door-double ...
  doors: [
    { name: 'Main door',      x: 7,  y: 6, w: 3.5, wall: 'h', type: 'door' },
    { name: 'Hall-Dining',    x: 12, y: 19, w: 4,   wall: 'h', type: 'opening' },
    { name: 'Kitchen-Dining', x: 11, y: 21, w: 3,   wall: 'v', type: 'opening' },
    { name: 'Dining-Passage', x: 17, y: 20, w: 4,   wall: 'v', type: 'opening' },
    { name: 'Hall-Stair',     x: 17, y: 7, w: 3,   wall: 'v', type: 'opening' },
    { name: 'Bedroom 1',      x: 17, y: 30, w: 3,   wall: 'v', type: 'door' },
    { name: 'Bath 1',         x: 8,  y: 29, w: 2.5, wall: 'v', type: 'door' },
    { name: 'Bath 2',         x: 4,  y: 39, w: 2.5, wall: 'h', type: 'door' },
    { name: 'Master Bedroom', x: 17, y: 41, w: 3,   wall: 'v', type: 'door' },
    { name: 'Back door',      x: 18, y: 49, w: 3,   wall: 'h', type: 'door' },
    { name: 'Living window',  x: 3,  y: 10, w: 5,   wall: 'v', type: 'window' },
    { name: 'Kitchen window', x: 3,  y: 21, w: 4,   wall: 'v', type: 'window' },
    { name: 'Bath 1 vent',    x: 3,  y: 30, w: 1.5, wall: 'v', type: 'window' },
    { name: 'Bath 2 vent',    x: 3,  y: 35, w: 1.5, wall: 'v', type: 'window' },
    { name: 'Master window',  x: 3,  y: 42, w: 5,   wall: 'v', type: 'window' },
    { name: 'Master rear window', x: 7, y: 49, w: 5, wall: 'h', type: 'window' },
    { name: 'Front gate',     x: 6,  y: 0,  w: 4,  wall: 'h', type: 'gate' }
  ]
};
