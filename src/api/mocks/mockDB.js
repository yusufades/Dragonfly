/**
 * Some mock data to test on.
 */

let levelgraph = require("levelgraph");
let level = require("level-browserify");
let d3 = require('d3');

import {data} from './live-animal-trade-csv';

let parsedData = d3.csvParse(data, function (d) {
    return {
        year: d.Year,
        tradeFlow: d.TradeFlow,
        value: d.TradeValueUS,
        reporter: d.Reporter,
        partner: d.Partner
    }
});

parsedData = parsedData.filter(v => v.tradeFlow == "Export")

const mockDB = (() => {
    let DB = levelgraph(level(`MockDB4`));



    DB.put(parsedData.map(v => ({predicate: v.tradeFlow, subject: v.reporter, object: v.partner, edge: {type: v.tradeFlow, value: v.value}})))

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
                            hash: object
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
                            hash: subject
                    }))
                    return resolve(parentNodes);
                })
            })
        },
        getStartNode: (nodeHash) => {
            return new Promise((resolve, reject) => {
                resolve(JSON.parse(JSON.stringify({hash: "Australia"})));
            })
        }
    }
})()



export default mockDB;

