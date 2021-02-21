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
    const partFactory = (shortname, inBool) => ({
        hash: shortname,
        kind: !inBool? "function" : "other",
        start: {},
        end: {},
        shortname
    })

    const inParts = ["seat", "fuel_tank", "engine", "propeller", "cargo"]
        .map(name => partFactory(name, true))

    const outParts = ["fuselage", "wing", "door", "tail", "rudder", "elevator", "flap", "winglet"]
        .map(name => partFactory(name, false))
    const parts = inParts.concat(outParts)

    /**
     * Store nodes based on hash.
     */
    const nodeMap = parts.reduce((acc, curr) => {
        acc[curr.hash] = curr
        return acc
    }, {});
    const p = Object.entries(nodeMap)
        .reduce((acc, [_,curr]) => {
            acc[curr.shortname] = curr.hash
            return acc
        }, {});
    const fuselage = nodeMap[p.fuselage]

    const edges = [
        {t: "bodyPart", s: p.fuselage, e: p.wing},
        {t: "bodyPart", s: p.fuselage, e: p.door},
        {t: "bodyPart", s: p.fuselage, e: p.tail},
        {t: "mechPart", s: p.fuselage, e: p.seat},
        {t: "mechPart", s: p.fuselage, e: p.cargo},
        {t: "bodyPart", s: p.wing, e: p.flap},
        {t: "bodyPart", s: p.wing, e: p.winglet},
        {t: "mechPart", s: p.wing, e: p.fuel_tank},
        {t: "mechPart", s: p.wing, e: p.engine},
        {t: "bodyPart", s: p.tail, e: p.rudder},
        {t: "bodyPart", s: p.tail, e: p.elevator},
        {t: "bodyPart", s: p.tail, e: p.elevator},
        {t: "mechPart", s: p.fuel_tank, e: p.engine},
        {t: "mechPart", s: p.engine, e: p.propeller},
    ]
    DB.put(edges.map(({s,e,t})=>({subject: s, predicate:"function", object: e, edge:{type: t, value: 3}})))

    // DB.put([{subject: nodeA.hash, predicate:"function", object: nodeB.hash, edge: {type: "function", value: 3}},
    //     {subject: nodeA.hash, predicate:"function", object: nodeC.hash, edge: {type: "cat", value: 3}},
    //     {subject: nodeB.hash, predicate:"function", object: nodeC.hash, edge: {type: "function", value: 3}}])

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
                resolve(JSON.parse(JSON.stringify(fuselage)));
            })
        }
    }
})()



export default mockDB;

