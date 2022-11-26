import { getIncomers, Position } from "reactflow";

const getNodeLabelById = (nds, ndId) => {
    var label = undefined;
    nds.forEach((node) => {
        if (node.id === ndId) {
            label = node.data.label;
        }
    });
    return label;
}

// Utilities
const getNodesHoverData = (nds, eds) => {
    var hoverStateCards = {};
    nds.forEach((nd) => {
        var posWeights = {};
        var negWeights = {};
        eds.forEach((edge) => {
            const conn = edge.id.split("-");
            if (conn[1] === nd.id) {
                var ndLabel = getNodeLabelById(nds, conn[0]);
                if (edge.data.weight >= 0) {posWeights[ndLabel] = edge.data.weight; }
                if (edge.data.weight < 0) {negWeights[ndLabel] = edge.data.weight; }
            }
        });
        hoverStateCards[nd.data.label] = {
            argument: nd.data.label,
            supportingNodes: nd.supportingNodes,
            attackingNodes: nd.attackingNodes,
            incomingNodes: getIncomers(nd, nds, eds),
            supportingWeights: posWeights,
            attackingWeights: negWeights,
        };
    });

    return hoverStateCards;
};

const getNormalisedEdgesByLayer = (edges, layer) => {
    var curLayerEdges = [];
    var weights = [];
    edges.forEach((edge) => {
        if (edge.layer === layer) {
            curLayerEdges.push(edge);
            weights.push(edge.data.weight);
        }
    });

    let minThreshold = 1;
    let minVal = Math.min.apply(weights);
    let maxVal = Math.max.apply(weights);

    // Normalise edge weights using min-max normalisation
    curLayerEdges.map((edge) => {
        edge.weight = minThreshold + (edge.weight - minVal) / (maxVal - minVal);
        return edge;
    });

    return curLayerEdges;
};

// Processing graph elements (nodes & edges)
export const jsonToGraph = (myData) => {
    if (!myData) {
        return [[], []];
    }
    var processedNodes = [];
    const myNodes = myData["nodes"];
    if (!myNodes) {
        return [[], []];
    }
    myNodes.forEach((node) => {
        var hidden = node.label[0] !== "O";
        processedNodes[node.id] = {
            id: String(node.id),
            className: "circle",
            data: { label: node.label },
            position: { x: node.position.x * 6, y: node.position.y * 3 },
            type: "defaultNode",
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            layer: node.layer + 1,
            supportingNodes: node.supporting_nodes,
            attackingNodes: node.attacking_nodes,
            hidden: hidden,
        };
    });

    var processedEdges = [];
    const myEdges = myData.edges;
    const numLayers = myEdges[myEdges.length - 1].layer + 1;
    myEdges.forEach((edge) => {
        var color;
        if (edge.edge_type === "SUPPORT") color = "green";
        else color = "red";
        processedEdges.push({
            id: edge.start_node.toString() + "-" + edge.end_node.toString(), // 
            source: edge.start_node.toString(),
            target: edge.end_node.toString(),
            layer: edge.layer + 1,
            type: "defaultEdge",
            hidden: true,
            data: {
                weight: parseFloat(edge.weight.toFixed(4)),
                edgeType: edge.edge_type,
            },
            markerEnd: { type: "arrow", width: 20, height: 20 },
            style: { stroke: color },
            animated: true,
        });
    });

    var normalizedEdges = [];
    for (let layer = 1; layer <= numLayers; layer++) {
        normalizedEdges = normalizedEdges.concat(getNormalisedEdgesByLayer(processedEdges, layer));
    }

    var nodesHoverData = getNodesHoverData(processedNodes, processedEdges);

    const nodes = processedNodes.map((nd) => {
        nd.data.argument = nodesHoverData[nd.data.label].argument;
        nd.data.incomingNodes = nodesHoverData[nd.data.label].incomingNodes;
        nd.data.supportingNodes = nodesHoverData[nd.data.label].supportingNodes;
        nd.data.attackingNodes = nodesHoverData[nd.data.label].attackingNodes;
        nd.data.supportingWeights = nodesHoverData[nd.data.label].supportingWeights;
        nd.data.attackingWeights = nodesHoverData[nd.data.label].attackingWeights;
        return nd;
    });

    return [nodes, normalizedEdges, numLayers];
};

// export const edges = processedEdges
