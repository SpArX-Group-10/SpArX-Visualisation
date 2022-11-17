import ReactFlow, { Controls, Background } from "reactflow";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "reactflow/dist/style.css";
import { jsonToGraph } from "./GraphElements";
import "./GraphElementsStyle.css";
import GraphEdge from "./Edge";
import GraphNode from "./Node";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { CircularProgress, Dialog, Menu, MenuItem, Stack, Typography } from "@mui/material";

export default function Flow() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [k, setK] = useState(1);
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

    const settingsOpen = Boolean(settingsAnchorEl);
    const location = useLocation();

    useEffect(() => {
        console.log(location);
        if (!location.state) return;
        const [nodes, edges] = jsonToGraph(location.state.graphJSON);
        setNodes(nodes);
        setEdges(edges);
    }, [location, location.state]);

    const nodeTypes = useMemo(() => ({ defaultNode: GraphNode }), []);
    const edgeTypes = useMemo(() => ({ defaultEdge: GraphEdge }), []);

    const renderPreviousLayer = (_, curNode) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.layer >= curNode.layer - k) {
                    node.hidden = false;
                }
                return node;
            })
        );

        setEdges((eds) =>
            eds.map((edge) => {
                if (edge.target === curNode.id && edge.data.weight !== 0) {
                    edge.hidden = false;
                }
                return edge;
            })
        );
    };

    const showEdgeLabel = (_, curEdge) => {
        setNodes((nds) =>
            nds.map((node) => {
                return node;
            })
        );

        setEdges((eds) =>
            eds.map((edge) => {
                if (edge === curEdge) {
                    if (curEdge.showing_label) {
                        curEdge.label = "";
                        curEdge.showing_label = false;
                    } else {
                        curEdge.label = String(curEdge.data.weight.toFixed(4));
                        curEdge.showing_label = true;
                    }
                }
                return edge;
            })
        );
    };

    return (
        <div style={{ height: "100vh" }}>
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                edges={edges}
                edgeTypes={edgeTypes}
                onNodeClick={renderPreviousLayer}
            >
                <Background />
                <Controls />
                <SettingsIcon
                    onClick={(event) => {
                        setSettingsAnchorEl(event.currentTarget);
                    }}
                    style={{ zIndex: 100, position: "absolute", top: "0px", right: "100px" }}
                />
                <Menu
                    anchorEl={settingsAnchorEl}
                    open={settingsOpen}
                    onClose={() => {
                        setSettingsAnchorEl(null);
                    }}
                    PaperProps={{
                        style: {
                            width: 350,
                            height: 50,
                        },
                    }}
                >
                    <MenuItem>
                        <div className="button-wrapper">
                            <label htmlFor="k">
                                <select
                                    id="renderLayersCount"
                                    value={k}
                                    onChange={(event) => setK(event.target.value)}
                                    //className="react-flow__panonscrollmode"
                                    style={{ writingMode: "horizontal-tb" }}
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                </select>
                            </label>
                            How many layers do you want to render?
                        </div>
                    </MenuItem>
                </Menu>
            </ReactFlow>
        </div>
    );
}
