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
