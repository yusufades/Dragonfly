import {combineReducers} from 'redux';

import {SELECT_NODE, GET_SINKS, GET_SOURCES, MOVE_DRAGONFLY, OPEN_DRAGONFLY, CLOSE_DRAGONFLY} from '../actions/dragonflyActions';

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

const sourcesReducer = (sources = [], action) => {
    switch (action.type){
        case GET_SOURCES:
            return [...action.nodes]
        default:
            return sources
    }
}

/**
 * Selector for the dragonfly sources.
 */
export const getSources = state => state.dragonfly.sources;

/**
 * 
 * @param {object with x, y} position 
 */
const moveReducer = (position = {x: 0, y:0}, action) => {
    
    switch (action.type){
        case MOVE_DRAGONFLY:
            if (!(action.x && action.y)){
                console.error("action requires an x and y")
                return position;
            }
            if (typeof action.x !== "number" || typeof action.y !== "number"){
                console.error(`Move dragonfly requires x and y to be a number.`)
                return position;
            }
            return {x: action.x, y: action.y}
        default:
            return position;
    }
}
export const getDragonflyPosition = state => state.dragonfly.position;

/**
 * Controls whether dragonfly is visible.
 */
const visibilityReducer = (isVisible = false, action) => {
    switch (action.type){
        case OPEN_DRAGONFLY:
            return true
        case CLOSE_DRAGONFLY:
            return false
        default:
            return isVisible
    }
}
export const getDragonflyVisibility = state => state.dragonfly.visibility;

const dragonflyReducer = combineReducers({
    selectedNode: selectedNodeReducer,
    sinks: sinksReducer,
    sources: sourcesReducer,
    position: moveReducer,
    visibility: visibilityReducer
})

export default dragonflyReducer;