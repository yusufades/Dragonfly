import {connect} from 'react-redux';
import React from 'react';

import './devDock.css';
/**
 * Import actions here
 */
import { addTriplet } from '../../actions/d3actions';

const devDock = React.createClass({
    render: function(){
        return <div id="devDock">
            <div>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input id="subject" value="" />
                </div>
                <div>
                    <label htmlFor="predicate">Edge:</label>
                    <input id="predicate" value="" />
                </div>
                <div>
                    <label htmlFor="object">Object:</label>
                    <input id="object" value="" />
                </div>
            </div>
            <button onClick={() => {this.props.addTriplet("a", 'rar', 'c')}}>Add Triplet</button>
        </div>
    }
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    addTriplet: (subjectHash, predicateType, objectHash) => dispatch(addTriplet(
        {hash: subjectHash}, {type: predicateType}, {hash: objectHash})),
});

export const DevDock = connect(
    mapStateToProps,
    mapDispatchToProps
)(devDock);