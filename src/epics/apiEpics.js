import * as Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

import {FETCH_INITIAL_NODE, receiveInitialNode} from '../actions/apiActions';

import rootApi from '../api/rootAPI';

const API = rootApi({});

/**
 * Epic for fetching and receiving initial node.
 */
const fetchNode = action$ =>
    action$.ofType(FETCH_INITIAL_NODE)
        .mergeMap(_ => Rx.Observable.from(API.getInitialNode()))
        .map(receiveInitialNode)


const apiEpics = combineEpics(
    fetchNode
)

export default apiEpics;
