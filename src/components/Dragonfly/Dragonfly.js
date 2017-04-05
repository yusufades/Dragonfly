import {connect} from 'react-redux';
import React from 'react';

import './dragonfly.css';
/**
 * Import actions here
 */
import {getSelectedNode, getSinks, getSources, getDragonflyPosition, getDragonflyVisibility} from '../../reducers/dragonflyReducer';
import {addTriplet} from '../../actions/d3actions';

/**
 * Todo: Add verification that predicate value exists.
 */


const dragonfly = React.createClass({
    getInitialState: function(){
        return {
        }
    },
    render: function(){
        return <div id="dragonfly" style={{
            left: this.props.position.x + 'px',
            top: this.props.position.y + 'px',
            display: this.props.isVisible ? "block" : "none"
        }
        }>
        <div id="left">
            <ul>{ this.props.sources.map(v =>
                <li key={v.hash}
                    onClick={
                        () => {this.props.addTriplet(v, v.predicate, this.props.selectedNode)}
                    }>
                    {v.hash}
                </li>)}
            </ul>
        </div>
        <div id="center" key="2">{ this.props.selectedNode.hash }</div>
        <div id="right"><ul>{ this.props.sinks.map(v => <li key={v.hash}
                    onClick={() => {this.props.addTriplet(this.props.selectedNode, v.predicate, v)}}>{v.hash}</li>)}</ul></div>
        </div>
    }
});

const mapStateToProps = state => ({
    selectedNode: getSelectedNode(state),
    sinks: getSinks(state),
    sources: getSources(state),
    position: getDragonflyPosition(state),
    isVisible: getDragonflyVisibility(state)
});

const mapDispatchToProps = dispatch => ({
    addTriplet: (subj, predicate, obj) => dispatch(addTriplet(subj, predicate, obj)),
});

export const Dragonfly = connect(
    mapStateToProps,
    mapDispatchToProps
)(dragonfly);