import {combineReducers} from 'redux';

/**
 * Import reducers
 */
import programState from './programState';

const rootReducer = combineReducers({
    programState
});

export default rootReducer;