import {combineReducers} from 'redux';

import {SELECT_NODE, GET_SINKS} from '../actions/dragonflyActions';

/**
 * Reducer for selecting 
 */
const selectedNodeReducer = (node = {}, action) => {
    switch (action.type){
        case SELECT_NODE:
            return action.node
        default:
            return node;
    }
}

// Selector for getting the selected node.
export const getSelectedNode = state => state.dragonfly.selectedNode;

const sinksReducer = (sinks = [], action) => {
    switch (action.type){
        case GET_SINKS:
            return [...action.nodes]
        default:
            return sinks
    }
}

/**
 * Selector for the dragonfly sinks.
 */
export const getSinks = state => state.dragonfly.sinks;

const dragonflyReducer = combineReducers({
    selectedNode: selectedNodeReducer,
    sinks: sinksReducer
})

export default dragonflyReducer;