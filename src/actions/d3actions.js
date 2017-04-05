/**
 * This file contains all actions that modify the d3 graph.
 * These are important actions because they work through
 * side effects using epics. This is very important because
 * d3 and webcola require side-effects to build the graph.
 * Includes:
 *  - Adding triplets
 *  - Removing triplets (edge)
 *  - Removing a node
 *  - Removing everything
 *  - Rescaling the window
 */


export const ADD_TRIPLET = "d3actions/ADD_TRIPLET";
export const ADD_NODE = "d3actions/ADD_NODE";
const REMOVE_TRIPLET = "d3actions/REMOVE_TRIPLET";
const REMOVE_NODE = "d3actions/REMOVE_NODE";
export const REMOVE_NODE_HASH = "d3actions/REMOVE_NODE_HASH";
const REMOVE_ALL_NODES = "d3actions/REMOVE_ALL_NODES";
export const ADD_EDGE = "d3actions/ADD_EDGE";

/**
 * Adds a triplet to the d3 diagram.
 * Nodes that are the same will not be duplicated.
 * Triplets that are the same will not be duplicated.
 * The triplets are directed so be wary what order you
 * put the nodes in. If you're representing:
 *          A -- likes --> B
 * You'll want the object to be:
 *          `{subject: {name: "A"},
 *            predicate: {type: "likes"},
 *            object: {name: "B"}}`
 * @param {object} subject is the starting node.
 * @param {object} predicate is the link (needs a type attribute).
 * @param {object} object is the end node.
 */
export const addTriplet = (subject, predicate, object) => ({
    triplet: {subject, predicate, object},
    type: ADD_TRIPLET
});

/**
 * Won't add nodes, will only add edges between existing nodes.
 * @alias addTriplet
 */
export const addEdge = (subject, predicate, object) => ({
    triplet: {subject, predicate, object},
    type: ADD_EDGE
});


/**
 * Adds a single node onto the graph.
 * Used for initiating the graph when it has
 * no nodes. (Or for nodes with no edges)
 * @param {object} node 
 */
export const addNode = (node) => ({
    type: ADD_NODE,
    node
});

/**
 * Remove a triplet from the d3 diagram.
 * Won't error if the triplet doesn't exist.
 * @param {object} subject is the starting node.
 * @param {object} predicate is the link (needs a type attribute).
 * @param {object} object is the end node.
 */
export const removeTriplet = (subject, predicate, object) => ({
    triplet: {subject, predicate, object},
    type: REMOVE_TRIPLET
});

/**
 * removeNode removes the node passed in,
 * and also all triplets (edges) to and from
 * the node.
 * Uses removeNodeHash
 * @param {object} nodeObject is the node to remove
 */
export const removeNode = (nodeObject) => ({
    nodeHash: nodeObject.hash,
    type: REMOVE_NODE_HASH
});

export const removeNodeHash = (nodeHash) => ({
    nodeHash,
    type: REMOVE_NODE_HASH
});

/**
 * Resets the d3 diagram to being empty.
 */
export const removeAllNodes = () => ({
    type: REMOVE_ALL_NODES
});
