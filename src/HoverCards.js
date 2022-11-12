import React from "react";

export const NodeHoverCard = ({argument, incomingNodes}) => {
    console.log("Got here")
    return (
        <div style={{width: 50, height: 50, backgroundColor: 'red'}}>
            <div style={{width: 25, height: 25}} className = "argument"> {argument} </div>
            <div style={{width: 25, height: 25}} className = "incomingNodes"> {incomingNodes} </div>
        </div>
    );
}

export const EdgeHoverCard = (props) => {
    return (
        <div style={{width: 50, height: 50, backgroundColor: 'red'}}>
            <div style={{width: 25, height: 25}} className = "weight"> {props.weight} </div>
            <div style={{width: 25, height: 25}} className = "edgeType"> {props.edgeType} </div>
        </div>
    );
}
