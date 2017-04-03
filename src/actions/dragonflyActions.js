/**
 * These actions manipulate the dragonfly
 */

const MOVE_DRAGONFLY = "dragonflyActions/MOVE_DRAGONFLY"
const OPEN_DRAGONFLY = "dragonflyActions/OPEN_DRAGONFLY"
const CLOSE_DRAGONFLY = "dragonflyActions/CLOSE_DRAGONFLY"
export const SELECT_NODE = "dragonflyActions/SELECT_NODE"

/**
 * Select a node object - put it in the middle of the dragonfly.
 * @param {object} node 
 */
export const selectNode = (node) => ({
    type: SELECT_NODE,
    node
});
