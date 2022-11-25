import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { PieChartComponent } from "./components/PieChart"

export const NodeHoverCard = ({ argument, incomingNodes, supportingNodes, attackingNodes, supportingWeights, attackingWeights, topN }) => {
    // var incoming = "[" + incomingNodes.map((nd) => nd.data.label).join(",") + "]";
    var supporting_nodes = "[" + supportingNodes.join(",") + "]";
    var attacking_nodes = "[" + attackingNodes.join(",") + "]";

    console.log(supportingWeights);
    console.log(attackingWeights);
    return (
        <div>
            Node label: {argument}
            <br />
            Directly supported by: {supporting_nodes}
            <br />
            Dirrectly attacked by: {attacking_nodes}
            <br />
            <Button 
                variant="contained" size="small" 
                style={{backgroundColor: "#1565C0", margin: "2px"}}
                onClick={() => PieChartComponent(supportingWeights, attackingWeights)}
            >
                Show Chart
            </Button>
        </div>
        
    );
};

export const EdgeHoverCard = ({ weight, edgeType, setIsHovered }) => {
    useEffect(() => {
        setIsHovered(true);
        return () => {
            setIsHovered(false);
        };
    }, [setIsHovered]);
    return (
        <div>
            Weight: {weight}
            <br />
            Edge type: {edgeType}
        </div>
    );
};
