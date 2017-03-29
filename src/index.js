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


/**
 * Import components
 */
import {DevDock} from './components/DevDock/DevDock';


ReactDOM.render(
  <Provider store={store}>
    <DevDock />
  </Provider>,
  document.getElementById('root')
);
