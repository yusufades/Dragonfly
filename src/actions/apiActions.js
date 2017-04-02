

export const FETCH_INITIAL_NODE = "apiActions/FETCH_INITIAL_NODE";
const RECEIVE_INITIAL_NODE = "apiActions/RECEIVE_INITIAL_NODE";


/**
 * Fetch initial node for graph
 */
export const fetchInitialNode = () => ({
    type: FETCH_INITIAL_NODE
});

/**
 * Receiver for fetching initial node.
 * @param {object} node initial node
 */
export const receiveInitialNode = (node) => ({
    type: RECEIVE_INITIAL_NODE,
    node
});