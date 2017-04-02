import * as Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

import {ADD_TRIPLET, REMOVE_NODE_HASH, ADD_NODE} from '../actions/d3actions';

// We have to import and initiate the d3Graph here.
import graphFactory from '../graph/graphFactory';

const graph = graphFactory("d3-graph");

const addNode = action$ =>
    action$.ofType(ADD_NODE)
        .do(({node}) => graph.addNode(node))
        .mergeMap(_ => Rx.Observable.empty());

const addTriplet = action$ =>
    action$.ofType(ADD_TRIPLET)
        .do(({triplet}) => graph.addTriplet(triplet))
        .mergeMap(_ => Rx.Observable.empty());

const removeNodeHash = action$ =>
    action$.ofType(REMOVE_NODE_HASH)
        .do(({nodeHash}) => graph.removeNode(nodeHash))
        .mergeMap(_ => Rx.Observable.empty());

const d3epics = combineEpics(
    addNode,
    addTriplet,
    removeNodeHash
);

export default d3epics;