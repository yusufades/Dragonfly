import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Redux dependencies
 */
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
/**
 * Redux actions, reducers and epics.
 */
import rootReducer from './reducers/rootReducer';
import rootEpic from './epics/rootEpic';

/**
 * Create and initiate the redux middleware
 */
const epicMiddleWare = createEpicMiddleware(rootEpic)
const logger = createLogger();
let store = createStore(rootReducer,
            applyMiddleware(epicMiddleWare, logger));

window.store = store;
/**
 * Import components
 */
import {DevDock} from './components/DevDock/DevDock';
import {Dragonfly} from './components/Dragonfly/Dragonfly';


ReactDOM.render(
  <Provider store={store}>
    <div>
    <Dragonfly />
    </div>
  </Provider>,
  document.getElementById('root')
);


import {fetchInitialNode} from './actions/apiActions';
setTimeout(() => {
  store.dispatch(fetchInitialNode());
}, 1000)