import {connect} from 'react-redux';
import React from 'react';

import './dragonfly.css';
/**
 * Import actions here
 */
import {getSelectedNode} from '../../reducers/dragonflyReducer';

const dragonfly = React.createClass({
    getInitialState: function(){
        return {
        }
    },
    render: function(){
        return <div id="dragonfly">
        <div id="left"></div>
        <div id="center" key="2">{ this.props.selectedNode.hash }</div>
        <div id="right"></div>
        </div>
    }
});

const mapStateToProps = state => ({
    selectedNode: getSelectedNode(state)
});

const mapDispatchToProps = dispatch => ({

});

export const Dragonfly = connect(
    mapStateToProps,
    mapDispatchToProps
)(dragonfly);