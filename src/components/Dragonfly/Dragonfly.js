import {connect} from 'react-redux';
import React from 'react';

import './dragonfly.css';
/**
 * Import actions here
 */

const dragonfly = React.createClass({
    getInitialState: function(){
        return {
        }
    },
    render: function(){
        return <div id="dragonfly"></div>
    }
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export const Dragonfly = connect(
    mapStateToProps,
    mapDispatchToProps
)(dragonfly);