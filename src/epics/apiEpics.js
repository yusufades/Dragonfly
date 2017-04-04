import * as Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

import {FETCH_INITIAL_NODE, RECEIVE_INITIAL_NODE, receiveInitialNode} from '../actions/apiActions';
import {REQUEST_SINKS, getSinks} from '../actions/dragonflyActions';
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

const apiEpics = combineEpics(
    fetchNode,
    receiveNode,
    fetchSinks
)

export default apiEpics;
