import * as Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

// Import actions

// Import api requests

// Import reducers

/**
 * Note: Don't use Rx.Observable ajax. Keep requests as a promise and
 *  decoupled from this code.
 */

require("./d3epics");

const rootEpic = combineEpics();

export default rootEpic