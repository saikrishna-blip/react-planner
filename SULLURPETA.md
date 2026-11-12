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
| P5 | Royal Mahal plan (latest) | `demo/src/sullurpeta/plan-data.js` (re-exported as `versions/P5.js`) |
| E1 | Modern White & Teak | `demo/exterior/versions/E1-modern-white-teak.html` |
| E2 | Sandstone Block & Sloped Frame | `demo/exterior/versions/E2-sandstone-block.html` |
| E3 | Royal Rajasthani Mahal | `demo/exterior/index.html` = `versions/E3-royal-rajasthani-mahal.html` |
| E4 | Kerala Tharavad | `demo/colony/index.html` (design E4) |
| E5 | Mediterranean Villa | `demo/colony/index.html` (design E5) |
| E6 | Monochrome Box | `demo/colony/index.html` (design E6) |
| E7 | Chettinad Heritage | `demo/colony/index.html` (design E7) |
| E8 | Colonial Palace | `demo/colony/index.html` (design E8) |
| E9 | Marble Portal Luxe | `demo/colony/index.html` (design E9) |

**Design Colony** (`/react-planner/colony/`): all nine designs side by side on one street, each on plan P5. Open one with `#E1` … `#E9`.

Open a plan with `#P1` … `#P5` after the planner link, or use the **Plan version** menu at the top.
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
