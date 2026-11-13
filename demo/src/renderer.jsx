import React from 'react';
import ReactDOM from 'react-dom';
import ContainerDimensions from 'react-container-dimensions';
import Immutable, {Map} from 'immutable';
import immutableDevtools from 'immutable-devtools';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import MyCatalog from './catalog/mycatalog';

import ToolbarScreenshotButton from './ui/toolbar-screenshot-button';
import ToolbarLoadPlotButton from './ui/toolbar-load-plot-button';
import { buildPlan, LOAD_SULLURPETA_PLAN, loadSullurpetaPlan } from './sullurpeta/load-plan';
import { PLAN_VERSIONS, LATEST_ID } from './sullurpeta/versions';

const AUTOSAVE_KEY = 'sullurpeta-house_v6';

import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  ReactPlanner,
  Plugins as PlannerPlugins,
} from 'react-planner'; //react-planner

//define state
let AppState = Map({
  'react-planner': new PlannerModels.State()
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  if (action.type === LOAD_SULLURPETA_PLAN) {
    return state.update('react-planner', plannerState => buildPlan(plannerState, action.versionId));
  }
  state = state.update('react-planner', plannerState => PlannerReducer(plannerState, action));
  return state;
};

let blackList = isProduction === true ? [] : [
  'UPDATE_MOUSE_COORDS',
  'UPDATE_ZOOM_SCALE',
  'UPDATE_2D_CAMERA'
];

if( !isProduction ) {
  console.info('Environment is in development and these actions will be blacklisted', blackList);
  console.info('Enable Chrome custom formatter for Immutable pretty print');
  immutableDevtools( Immutable );
}

//init store
let store = createStore(
  reducer,
  null,
  !isProduction && window.devToolsExtension ?
    window.devToolsExtension({
      features: {
        pause   : true,     // start/pause recording of dispatched actions
        lock    : true,     // lock/unlock dispatching actions and side effects
        persist : true,     // persist states on page reloading
        export  : true,     // export history of actions in a file
        import  : 'custom', // import history of actions from a file
        jump    : true,     // jump back and forth (time travelling)
        skip    : true,     // skip (cancel) actions
        reorder : true,     // drag and drop actions in the history list
        dispatch: true,     // dispatch custom actions or action creators
        test    : true      // generate tests for the selected actions
      },
      actionsBlacklist: blackList,
      maxAge: 999999
    }) :
    f => f
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave(AUTOSAVE_KEY),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [
  ToolbarLoadPlotButton,
  ToolbarScreenshotButton,
];

//render
ReactDOM.render(
  (
    <Provider store={store}>
      <ContainerDimensions>
        {({width, height}) =>
          <ReactPlanner
            catalog={MyCatalog}
            width={width}
            height={height}
            plugins={plugins}
            toolbarButtons={toolbarButtons}
            stateExtractor={state => state.get('react-planner')}
          />
        }
      </ContainerDimensions>
    </Provider>
  ),
  document.getElementById('app')
);

// ---------- plan version picker (top centre) ----------
// Open a named version with #P1 … #P6 at the end of the link; no hash = your last drawing (autosaved).
const hashVersion = () => { const m = (window.location.hash || '').match(/^#(P\d+)$/i); return m ? m[1].toUpperCase() : null; };
const picker = document.createElement('div');
picker.style.cssText = 'position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:9000;display:flex;gap:6px;align-items:center;' +
  'background:rgba(40,44,52,.92);color:#fff;padding:6px 10px;border-radius:999px;font:13px Helvetica,Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.25)';
const label = document.createElement('span'); label.textContent = 'Plan version';
const select = document.createElement('select'); select.id = 'plan-version';
select.style.cssText = 'font:13px Helvetica,Arial,sans-serif;border-radius:6px;padding:3px 6px;border:0;max-width:62vw';
const own = document.createElement('option'); own.value = ''; own.textContent = 'My drawing (autosaved)'; select.appendChild(own);
PLAN_VERSIONS.forEach((v) => { const o = document.createElement('option'); o.value = v.id; o.textContent = `${v.id} - ${v.name}${v.latest ? ' (latest)' : ''}`; o.title = v.summary; select.appendChild(o); });
picker.appendChild(label); picker.appendChild(select); document.body.appendChild(picker);

function openVersion(id) {
  select.value = id || '';
  if (id) store.dispatch(loadSullurpetaPlan(id));
}
select.addEventListener('change', () => {
  const id = select.value;
  if (id) { try { history.replaceState(null, '', '#' + id); } catch (e) { window.location.hash = id; } openVersion(id); }
  else { try { history.replaceState(null, '', window.location.pathname); } catch (e) {} }
});
window.addEventListener('hashchange', () => { const id = hashVersion(); if (id) openVersion(id); });

// First visit: pre-draw the latest plan; a #Pn link always opens that version
setTimeout(() => {
  const id = hashVersion();
  if (id) return openVersion(id);
  let saved = null;
  try { saved = window.localStorage.getItem(AUTOSAVE_KEY); } catch (e) {}
  if (!saved) openVersion(LATEST_ID);
}, 300);
