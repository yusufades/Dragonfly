/**
 * These actions manipulate the dragonfly
 */

export const MOVE_DRAGONFLY = "dragonflyActions/MOVE_DRAGONFLY"
export const OPEN_DRAGONFLY = "dragonflyActions/OPEN_DRAGONFLY"
export const CLOSE_DRAGONFLY = "dragonflyActions/CLOSE_DRAGONFLY"
export const SELECT_NODE = "dragonflyActions/SELECT_NODE"

export const REQUEST_SINKS = "dragonflyActions/REQUEST_SINKS"
export const GET_SINKS = "dragonflyActions/GET_SINKS"
export const REQUEST_SOURCES = "dragonflyActions/REQUEST_SOURCES"
export const GET_SOURCES = "dragonflyActions/GET_SOURCES"

/**
 * Select a node object - put it in the middle of the dragonfly.
 * @param {object} node 
 */
export const selectNode = (node) => ({
    type: SELECT_NODE,
    node
});

/**
 * get Sinks for the dragonfly view
 * @param {object[]} nodes 
 */
export const getSinks = nodes => ({
    type: GET_SINKS,
    nodes
})

/**
 * Request sinks for a node - for dragonfly
 * @param {object} node 
 */
export const requestSinks = node => ({
    type: REQUEST_SINKS,
    node
})

/**
 * get Sources for the dragonfly view
 * @param {object[]} nodes 
 */
export const getSources = nodes => ({
    type: GET_SOURCES,
    nodes
})

/**
 * Request Sources for a node - for dragonfly
 * @param {object} node 
 */
export const requestSources = node => ({
    type: REQUEST_SOURCES,
    node
})

/**
 * Moves dragonfly 
 */
export const moveDragonfly = (x, y) => ({
    type: MOVE_DRAGONFLY,
    x,
    y
})

export const closeDragonfly = () => ({
    type: CLOSE_DRAGONFLY
})

export const openDragonfly = () => ({
    type: OPEN_DRAGONFLY
})