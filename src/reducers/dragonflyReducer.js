import {combineReducers} from 'redux';

import {SELECT_NODE} from '../actions/dragonflyActions';

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

export const getSelectedNode = state => state.dragonfly.selectedNode;



const dragonflyReducer = combineReducers({
    selectedNode: selectedNodeReducer
})

export default dragonflyReducer;