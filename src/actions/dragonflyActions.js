/**
 * These actions manipulate the dragonfly
 */

const MOVE_DRAGONFLY = "dragonflyActions/MOVE_DRAGONFLY"
const OPEN_DRAGONFLY = "dragonflyActions/OPEN_DRAGONFLY"
const CLOSE_DRAGONFLY = "dragonflyActions/CLOSE_DRAGONFLY"
export const SELECT_NODE = "dragonflyActions/SELECT_NODE"

export const REQUEST_SINKS = "dragonflyActions/REQUEST_SINKS"
export const GET_SINKS = "dragonflyActions/GET_SINKS"
const GET_SOURCES = "dragonflyActions/GET_SOURCES"

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
 * Request sinks for a node.
 * @param {object} node 
 */
export const requestSinks = node => ({
    type: REQUEST_SINKS,
    node
})