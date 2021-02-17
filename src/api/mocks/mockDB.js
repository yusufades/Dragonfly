/**
 * Some mock data to test on.
 */

let levelgraph = require("levelgraph");
let level = require("level");

const mockDB = (() => {
    let DB = levelgraph(level(`MockDB3`));

    /**
     * The below nodes match the following code:
     * ```
     * function a(){
     *      c()
     *      return b()
     * }
     * function b(){
     *      c()
     *      return 1
     * }
     * function c(){
     *      return 0
     * }
     * ```
     */

    const nodeA = {hash: "function-a-start-end",
                    kind: "function",
                    start: {},
                    end: {},
                    shortname: "function a()"};
    const nodeB = {hash: "function-b-start-end",
                    kind: "function",
                    start: {},
                    end: {},
                    shortname: "function b()"}
    const nodeC = {hash: "function-c-start-end",
                    kind: "function",
                    start: {},
                    end: {},
                    shortname: "function c()"}

    /**
     * Store nodes based on hash.
     */
    const nodeMap = {}
    nodeMap[nodeA.hash] = nodeA;
    nodeMap[nodeB.hash] = nodeB;
    nodeMap[nodeC.hash] = nodeC;

    DB.put([{subject: nodeA.hash, predicate:"function", object: nodeB.hash, edge: {type: "function", value: 3}},
        {subject: nodeA.hash, predicate:"function", object: nodeC.hash, edge: {type: "function", value: 3}},
        {subject: nodeB.hash, predicate:"function", object: nodeC.hash, edge: {type: "function", value: 3}}])

    return {
        /**
         * Returns a promise which will eventually return
         * a list of child nodes with predicate type included.
         */
        getAllChildren: (nodeHash) => {
            return new Promise((resolve, reject) => {
                /**
                 * Call resolve when done.
                 */
                DB.get({subject: nodeHash}, function(err, list){
                    if (err) {
                        return reject(err)
                    }
                    if (list.length === 0){
                        return resolve([])
                    }
                    let childNodes = list.map(({edge, object}) => ({
                            predicate: edge,
                            ...nodeMap[object]
                    }))
                    return resolve(childNodes);

                })
            })
        },
        getAllParents: (nodeHash) => {
            return new Promise((resolve, reject) => {
                /**
                 * Call resolve when done.
                 */
                DB.get({object: nodeHash}, function(err, list){
                    if (err) {
                        return reject(err)
                    }
                    if (list.length === 0){
                        return resolve([])
                    }
                    let parentNodes = list.map(({edge, subject}) => ({
                            predicate: edge,
                            ...nodeMap[subject]
                    }))
                    return resolve(parentNodes);
                })
            })
        },
        getStartNode: (nodeHash) => {
            return new Promise((resolve, reject) => {
                resolve(JSON.parse(JSON.stringify(nodeB)));
            })
        }
    }
})()



export default mockDB;

