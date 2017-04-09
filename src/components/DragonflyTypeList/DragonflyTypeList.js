import React from 'react';

import "./dragonflytypelist.css";

const DragonflyTypeList = (props) => {
    if (!props.type){
        console.error("No props.type")
    }
    if (!props.nodes){
        console.error("No props.nodes")
    }
    if (!props.clickHandler){
        console.error("No props.clickHandler")
    }
    if (!props.floatLeft){
        console.error("No props.floatLeft")
    }
    return (<li key={props.type} className="typeList">
                    {props.type}
                    <ul style={props.floatLeft ? {left: "-100px"}:{left: "100px"}}>{
                        props.nodes.map(v => <li key={v.hash}
                            onClick={() => props.clickHandler(v)}>
                                {v.hash}
                        </li>)}
                    </ul>
            </li>)
}

export default DragonflyTypeList;