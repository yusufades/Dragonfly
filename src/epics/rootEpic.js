import * as Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

// Import actions

// Import api requests

// Import reducers

/**
 * Note: Don't use Rx.Observable ajax. Keep requests as a promise and
 *  decoupled from this code.
 */

import d3epics from './d3epics';

const rootEpic = combineEpics(
    d3epics
);

export default rootEpic