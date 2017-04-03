import {combineReducers} from 'redux';

/**
 * Import reducers
 */
import programState from './programState';
import dragonflyReducer from './dragonflyReducer';

const rootReducer = combineReducers({
    programState,
    dragonfly: dragonflyReducer
});

export default rootReducer;