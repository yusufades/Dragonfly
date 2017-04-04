import {connect} from 'react-redux';
import React from 'react';

import './dragonfly.css';
/**
 * Import actions here
 */
import {getSelectedNode, getSinks, getSources} from '../../reducers/dragonflyReducer';

const dragonfly = React.createClass({
    getInitialState: function(){
        return {
        }
    },
    render: function(){
        return <div id="dragonfly">
        <div id="left"><ul>{ this.props.sources.map(v => <li key={v.hash}>{v.hash}</li>)}</ul></div>
        <div id="center" key="2">{ this.props.selectedNode.hash }</div>
        <div id="right"><ul>{ this.props.sinks.map(v => <li key={v.hash}>{v.hash}</li>)}</ul></div>
        </div>
    }
});

const mapStateToProps = state => ({
    selectedNode: getSelectedNode(state),
    sinks: getSinks(state),
    sources: getSources(state)
});

const mapDispatchToProps = dispatch => ({

});

export const Dragonfly = connect(
    mapStateToProps,
    mapDispatchToProps
)(dragonfly);