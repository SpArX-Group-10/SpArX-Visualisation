import ReactFlow, { Controls, Background } from "reactflow";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "reactflow/dist/style.css";
import { jsonToGraph } from "./GraphElements";
import "./GraphElementsStyle.css";
import GraphEdge from "./Edge";
import GraphNode from "./Node";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { CircularProgress, Dialog, Menu, MenuItem, Stack, Typography } from "@mui/material";

const getNodesToShow = (nds, curNode, k, top) => {
    let res = []
    const aux = (nds, curNode, k, top) => nds.map((node) => {
        if (k===0) {
            return;
        }
        const suppLen = curNode.supportingNodes.length;
        const attLen = curNode.attackingNodes.length;
        for (var i=0; i<Math.min(top, attLen); i++) {
            if (node.data.label === curNode.attackingNodes[i]) {
                res.push(node.data.label)
                aux(nds, node, k-1, top)
                }
        }

        for (var i=0; i<Math.min(top, suppLen); i++) {
            if (node.data.label === curNode.supportingNodes[suppLen-1-i]) {
                res.push(node.data.label)
                aux(nds, node, k-1, top)
                }
        }
    })
    aux(nds, curNode, k, top);
    return res;
}

export default function Flow() {
    const [layers, setLayers] = useState(0)
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [graphJson, setGraphJson] = useState(null);
    const [k, setK] = useState(1);
    const [top, setTop] = useState(1);
    const [showTop, setShowTop] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

    const settingsOpen = Boolean(settingsAnchorEl);
    let { id } = useParams();

    useEffect(() => {
        if (!id) return;
        fetch(`http://127.0.0.1:5001/api/get_vis/${id}`)
            .then((res) => res.json())
            .then((jsonData) => {
                const [nodes, edges, layers] = jsonToGraph(jsonData);
                setNodes(nodes);
                setEdges(edges);
                setLayers(layers)
            });
    }, [id]);

    const nodeTypes = useMemo(() => ({ defaultNode: GraphNode }), []);
    const edgeTypes = useMemo(() => ({ defaultEdge: GraphEdge }), []);

    const renderPreviousLayer = (_, curNode) => {
        if (showTop) {
            const nodesToShow = getNodesToShow(nodes, curNode, k, top)
            // Show top attackers/supporters from previous layer
            setNodes((nds) => nds.map((node) => {
                nodesToShow.forEach((nodeToShow) => {
                    if (nodeToShow === node.data.label){
                        node.hidden=false;
                    }
                })
                return node;
            })

            );

        } else {
            // Show k previous layers
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.layer >= curNode.layer - k) {
                        node.hidden = false;
                    }
                    return node;         
                })
            );
        }   
 
        setEdges((eds) =>
            eds.map((edge) => {
                if (edge.layer >= curNode.layer - k && edge.data.weight !== 0) {
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
            <Dialog open={isLoading}>
                <Stack justifyContent="center" alignItems="center" padding={2} gap={1}>
                    <CircularProgress />
                    <Typography>Loading Network Graph</Typography>
                </Stack>
            </Dialog>
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
                    style={{ zIndex: 100, position: "absolute", top: "0px", left: "20px" }}
                />
                <Menu
                    anchorEl={settingsAnchorEl}
                    open={settingsOpen}
                    onClose={() => {
                        setSettingsAnchorEl(null);
                    }}
                    PaperProps={{
                        style: {
                            width: 560,
                            height: 150,
                        },
                    }}
                >
                    <MenuItem>
                        <div className="button-wrapper-att-supp">
                        Do you want to show top attackers/supporters?__
                            <label htmlFor="show_top_att_supp_showed">
                                <select
                                    id="renderShowTopAttSupp"
                                    value={showTop}
                                    onChange={(event) => setShowTop(event.target.value)}
                                    style={{ writingMode: "horizontal-tb" }}
                                >
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </label>
                        </div>
                    </MenuItem>
                    <div style={{ height: "10px" }}></div>
                    <MenuItem>
                        <div className="button-wrapper-layer">
                        How many layers do you want to render?__
                            <label htmlFor="num_layers_rendered">
                                <select
                                    id="renderLayersCount"
                                    value={k}
                                    onChange={(event) => setK(event.target.value)}
                                    style={{ writingMode: "horizontal-tb" }}
                                >
                                    {(new Array(layers)).fill(undefined).map((_, k) =>k + 1).map(i=><option value={i}>{i}</option>)}
                                </select>
                            </label>
                        </div>
                    </MenuItem>
                    <div style={{ height: "10px" }}></div>
                    <MenuItem>
                        <div className="button-wrapper-att-supp">
                        How many of the top attackers/supporters do you want to show?__
                            <label htmlFor="top_att_supp_showed">
                                <select
                                    id="renderTopAttSupp"
                                    value={top}
                                    onChange={(event) => setTop(event.target.value)}
                                    style={{ writingMode: "horizontal-tb" }}
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </label>
                        </div>
                    </MenuItem>
                </Menu>
            </ReactFlow>
        </div>
    );
}
