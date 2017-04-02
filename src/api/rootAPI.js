/**
 * We want to abstract away api calls.
 * 
 * We need to call an api for getting edges
 * to and from a node.
 */
import mockDB from './mocks/mockDB';

/**
 * TODO: Add options and make it not just a mock.
 */
const rootAPI = (options) => {
    function getAllChildren(nodeHash){
        return mockDB.getAllChildren(nodeHash)
    }
    function getAllParents(nodeHash){
        return mockDB.getAllParents(nodeHash)
    }
    function getInitialNode(){
        return mockDB.getStartNode()
    }

    return {
        getAllChildren,
        getAllParents,
        getInitialNode
    }
}

export default rootAPI
