import * as Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

import {FETCH_INITIAL_NODE, RECEIVE_INITIAL_NODE, receiveInitialNode} from '../actions/apiActions';
import {REQUEST_SINKS, getSinks, REQUEST_SOURCES, getSources} from '../actions/dragonflyActions';
import {ADD_TRIPLET, addEdge} from '../actions/d3actions';
import {addNode} from '../actions/d3actions';
import rootApi from '../api/rootAPI';

const API = rootApi({});

/**
 * Epic for fetching and receiving initial node.
 */
const fetchNode = action$ =>
    action$.ofType(FETCH_INITIAL_NODE)
        .mergeMap(_ => Rx.Observable.from(API.getInitialNode()))
        .map(receiveInitialNode)

const receiveNode = action$ =>
    action$.ofType(RECEIVE_INITIAL_NODE)
        .map(({node}) => addNode(node))

const fetchSinks = action$ =>
    action$.ofType(REQUEST_SINKS)
        .mergeMap(({node}) => Rx.Observable.from(API.getAllChildren(node.hash)))
        .map(getSinks)

const fetchSources = action$ =>
    action$.ofType(REQUEST_SOURCES)
        .mergeMap(({node}) => Rx.Observable.from(API.getAllParents(node.hash)))
        .map(getSources)

/**
 * Fires when a triplet is added.
 * Because we want to add edges between
 * the new triplet and any nodes already
 * placed, grab all sources and sinks for
 * the subject and predicate, then fire
 * ADD_EDGE for each triplet.
 */
const onAddTripletAddEdge = action$ =>
    action$.ofType(ADD_TRIPLET)
        .mergeMap(({triplet}) =>
            Rx.Observable.merge([Rx.Observable.from(API.getAllParents(triplet.subject.hash))
                                    .flatMap(v => v)
                                    .map(v => addEdge(v, v.predicate, triplet.subject)),
                                Rx.Observable.from(API.getAllChildren(triplet.subject.hash))
                                    .flatMap(v => v)
                                    .map(v => addEdge(triplet.subject, v.predicate, v)),
                                Rx.Observable.from(API.getAllParents(triplet.object.hash))
                                    .flatMap(v => v)
                                    .map(v => addEdge(v, v.predicate, triplet.object)),
                                Rx.Observable.from(API.getAllChildren(triplet.object.hash))
                                    .flatMap(v => v)
                                    .map(v => addEdge(triplet.object, v.predicate, v)),]))
        .flatMap(v => v)

        
        

const apiEpics = combineEpics(
    fetchNode,
    receiveNode,
    fetchSinks,
    fetchSources,
    onAddTripletAddEdge
)

export default apiEpics;
