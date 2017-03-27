// We have to import and initiate the d3Graph here.
import graphFactory from '../graph/graphFactory';

const graph = graphFactory("d3-graph");


setTimeout(function(){
    graph.addTriplet({subject: {hash: "A", name: "A"},
                      predicate: {type: "depends on"},
                      object: {hash: "B", name: "B"}})
}, 2000);
