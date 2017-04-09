import {connect} from 'react-redux';
import React from 'react';

import './dragonfly.css';
/**
 * Import actions here
 */
import {getSelectedNode, getSinks, getSources,
    getDragonflyPosition, getDragonflyVisibility,
    getSinksPredicates, getSourcePredicates} from '../../reducers/dragonflyReducer';
import {addTriplet} from '../../actions/d3actions';

import DragonflyTypeList from '../DragonflyTypeList/DragonflyTypeList';

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
            <ul>{ this.props.sourceTypes.map(type =>
                    <DragonflyTypeList 
                     type={type} 
                     nodes={this.props.sources(type)}
                     clickHandler={node => {this.props.addTriplet(node, node.predicate, this.props.selectedNode)}}/>
                )}
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
    sources: type => getSources(state, type),
    sourceTypes: getSourcePredicates(state),
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