# Sullurpeta House Planner (fork of cvdlab/react-planner)

A customized version of react-planner for planning a house on a **24' × 60' plot in Sullurpeta**.

## What's changed from the original
| Change | Where |
|---|---|
| Opens with the plot already drawn: compound wall with a gate, setbacks, and a ground-floor 2BHK layout | `demo/src/sullurpeta/plan-data.js`, `load-plan.js` |
| 🏠 **Load my plot** toolbar button to reset to the starter plan | `demo/src/ui/toolbar-load-plot-button.jsx` |
| Wall lengths shown in **feet-inches**, rooms labelled with **name + sq ft** | `src/components/viewer2d/ruler.jsx`, `area.jsx` |
| Property editors (thickness, height, door width) default to **feet** | `src/catalog/properties/property-lenght-measure.jsx`, `element-editor.jsx` |
| New **"opening"** element: a gap in a wall without a door | `demo/src/catalog/holes/opening/` |
| Fixed upstream bug: rooms sharing a corner could hide each other's labels | `src/class/layer.js` |
| Walls use Indian sizes: 9" external, 4.5" internal, 10 ft height, 5 ft compound wall | `plan-data.js` → `wall` |
| GitHub Pages auto-publish on every push | `.github/workflows/pages.yml` |

## Versions (never overwritten)
All plans and exterior designs keep a fixed code. See the register at `/react-planner/versions/`.

| Code | Name | Files |
|---|---|---|
| P1 | Starter 2BHK, front parking | `demo/src/sullurpeta/versions/P1.js` |
| P2 | Back garden, no front parking | `versions/P2.js` |
| P3 | Modern entrance | `versions/P3.js` |
| P4 | Recessed entrance bay | `versions/P4.js` |
| P5 | Royal Mahal plan | `demo/src/sullurpeta/versions/P5.js` (frozen snapshot) |
| P6 | Vastu plan, south-facing (latest) | `demo/src/sullurpeta/plan-data.js` (re-exported as `versions/P6.js`) |
| I1 | Earthy Terracotta interior (plan P6) | `demo/interior/index.html` (default style; frozen copy `demo/interior/versions/I1-earthy-terracotta.html`) |
| I2 | Scandi Light Sage | interior style |
| I3 | Royal Rajasthani | interior style |
| I4 | Chettinad Heritage | interior style |
| I5 | Coastal Teal | interior style |
| I6 | Contemporary Charcoal & Brass | interior style |
| I7 | Japandi Calm | interior style |
| I8 | Boho Jaipur | interior style |
| E1 | Modern White & Teak | `demo/exterior/versions/E1-modern-white-teak.html` |
| E2 | Sandstone Block & Sloped Frame | `demo/exterior/versions/E2-sandstone-block.html` |
| E3 | Royal Rajasthani Mahal | `demo/exterior/index.html` = `versions/E3-royal-rajasthani-mahal.html` |
| E4 | Kerala Tharavad | `demo/colony/index.html` (design E4) |
| E5 | Mediterranean Villa | `demo/colony/index.html` (design E5) |
| E6 | Monochrome Box | `demo/colony/index.html` (design E6) |
| E7 | Chettinad Heritage | `demo/colony/index.html` (design E7) |
| E8 | Colonial Palace | `demo/colony/index.html` (design E8) |
| E9 | Marble Portal Luxe | `demo/colony/index.html` (design E9) |
| E10 | Goan Portuguese Casa | colony design E10 |
| E11 | Japandi Zen House | colony design E11 |
| E12 | Brick Jali House | colony design E12 |
| E13 | Bombay Art Deco | colony design E13 |
| E14 | Santorini White | colony design E14 |
| E15 | Moroccan Riad | colony design E15 |
| E16 | Industrial Loft | colony design E16 |
| E17 | Tropical Modern | colony design E17 |
| E18 | Nordic Gable | colony design E18 |

**Design Colony** (`/react-planner/colony/`): all 18 designs side by side in one row, each on plan P5, with a street slider for a close look. Open one with `#E1` … `#E18`. It has a solo view, live colour pickers, part switches (gate, plants, head room, garden, name board), sun direction and Save picture. To add a design, add one `def({...})` block with the next code.

Open a plan with `#P1` … `#P6` after the planner link, or use the **Plan version** menu at the top.
Rule for new work: a new design gets the next code (P6, E4 …); old files are never edited.
Fixed specs since P2: plot 24 × 60, setbacks 6/3/3/3, house 18 × 43 (x 3–21, y 6–49), 11 ft back garden, no front parking,
walls 9" / 4.5" / 10 ft, compound wall 5 ft.

## Exterior 3D view
`demo/exterior/index.html` is a standalone 3D front elevation (three.js) with colour schemes, roof and canopy slabs,
stone and wood cladding, and day/dusk/night decorative lighting. It's published at `/react-planner/exterior/`.
Colours live in the `SCHEMES` object at the top of its script.

## Publish your fork (one time)
1. In your fork on GitHub, go to **Settings → Pages → Source: GitHub Actions**.
2. Go to the **Actions** tab, open **Build and publish planner**, and click **Run workflow** (about 3 minutes).
3. Open `https://<your-username>.github.io/react-planner/`.

## Using it
- **Draw:** use the ➕ catalog to add walls, doors, windows, furniture, or stairs. Click any element to edit its size in feet.
- **3D:** click **3D** to orbit the house, or 🚶 to walk through it.
- **Save / open:** the 💾 and 📂 buttons save the plan as a `.json` file. Keep these in the repo as versions (`plans/v1.json` …).
- Your work also autosaves in the browser.

## Changing the starter plan with Claude
Ask Claude to edit `demo/src/sullurpeta/plan-data.js`. For example: *"make Master Bedroom 12 ft deep"*, *"add a pooja room near the kitchen"*, *"add a first-floor layer"*. Then push, and the site rebuilds automatically. In the app, click 🏠 to load the new version. This replaces the current drawing, so save it first.

Coordinates are in feet. `x` is measured from the left plot edge (looking from the road), and `y` is measured from the road edge.

## Run locally
```
npm install --legacy-peer-deps
NODE_OPTIONS=--openssl-legacy-provider npm start      # http://localhost:9000
```

> Draft layouts for discussion only. The setbacks are placeholders. Structural, electrical, plumbing and approval drawings must come from a licensed engineer or architect.

## Plot facing and Vastu (P6 / I1)

The plot (13°42'02.5"N 80°02'01.4"E) faces **south**: road on the south, a neighbour's house on the east, garden on the north. From P6 onward `x` runs west to east and `y` runs south (road) to north.

| Zone | Room in P6 |
|---|---|
| South-West | Master bedroom (bed head south), dressing, bath |
| South | Porch, main door east of the centre line, foyer |
| South-East | Kitchen, cooking facing east |
| West | Staircase, dining side of the hall, both baths |
| Centre | Open floor of the hall |
| East | Living, two large east windows |
| North-West | Bedroom 2 |
| North | Study, passage, back door, garden |
| North-East | Pooja; tulsi and rainwater pit in the garden |

**Interior I1** (`/react-planner/interior/`): furnished 3D view with Dollhouse, Plan and Walk-inside modes, day/evening, a Vastu zone overlay, and each room's palette and finishes. Pick a style with the chips or `#living-I3` (room then style code). Open a room with `#living`, `#kitchen`, `#master`, `#pooja`, `#dining`, `#bed2`, `#study`, `#foyer`.

Exteriors E1–E18 were drawn on plan P5 (entrance on the left of the front). They have not been redrawn for P6.
