import * as Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

import {ADD_TRIPLET, REMOVE_NODE_HASH} from '../actions/d3actions';

// We have to import and initiate the d3Graph here.
import graphFactory from '../graph/graphFactory';

const graph = graphFactory("d3-graph");
console.log(graph);

export const addTriplet = action$ =>
    action$.ofType(ADD_TRIPLET)
        .do(({triplet}) => graph.addTriplet(triplet))
        .mergeMap(_ => Rx.Observable.empty());

export const removeNodeHash = action$ =>
    action$.ofType(REMOVE_NODE_HASH)
        .do(({nodeHash}) => graph.removeNode(nodeHash))
        .mergeMap(_ => Rx.Observable.empty());

const d3epics = combineEpics(
    addTriplet,
    removeNodeHash
);

export default d3epics;