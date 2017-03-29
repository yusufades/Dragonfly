import * as Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

import {ADD_TRIPLET} from '../actions/d3actions';

// We have to import and initiate the d3Graph here.
import graphFactory from '../graph/graphFactory';

const graph = graphFactory("d3-graph");


export const addTriplet = (action$, store) =>
    action$.ofType(ADD_TRIPLET)
        .do(({triplet}) => graph.addTriplet(triplet))
        .mergeMap(_ => Rx.Observable.empty())


const d3epics = combineEpics(
    addTriplet
);

export default d3epics;