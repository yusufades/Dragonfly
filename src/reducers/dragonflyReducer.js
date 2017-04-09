import {combineReducers} from 'redux';

import * as _ from "underscore";

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
 * Optional input for filtering by type.
 */
export const getSinks = (state, type) => (state.dragonfly.sinks)
                                            .filter(node => {
                                                if (type === undefined){
                                                    return true
                                                }
                                                return type === node.predicate.type;
                                            });
                                                
/**
 * Selector for getting the different types
 */
export const getSinksPredicates = state => _.uniq(getSinks(state).map(v => v.predicate.type), false);

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
 * Optionally filter for only the predicate type.
 */
export const getSources = (state, type) => (state.dragonfly.sources)
                                                .filter(node => {
                                                    if (type === undefined){
                                                        return true
                                                    }
                                                    return type === node.predicate.type;
                                                });

/**
 * Selector for getting the different types
 */
export const getSourcePredicates = state => _.uniq(getSources(state).map(v => v.predicate.type), false);

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