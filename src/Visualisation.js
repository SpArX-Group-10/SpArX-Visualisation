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
import { CircularProgress, Dialog, Menu, MenuItem, Stack, Typography, IconButton, Popover } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ISDEV = process.env.NODE_ENV === "development";

const ENDPOINT = ISDEV ? "http://127.0.0.1:5001/api/get_vis/" : "https://sparx-vis.herokuapp.com/api/get_vis/";

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
    const [maxSupAtt, setMaxSupAtt] = useState(0);
    const [layers, setLayers] = useState(0);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [graphJson, setGraphJson] = useState(null);
    const [k, setK] = useState(1);
    const [top, setTop] = useState(1);
    const [showTop, setShowTop] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
    const [popoverAnchor, setPopoverAnchor] = useState(null);

    const settingsOpen = Boolean(settingsAnchorEl);
    let { id } = useParams();

    useEffect(() => {
        if (!id) return;
        fetch(`${ENDPOINT}${id}`)
            .then((res) => res.json())
            .then((jsonData) => {
                const [nodes, edges, layers, maxSupAtt] = jsonToGraph(jsonData);
                setNodes(nodes);
                setEdges(edges);
                setLayers(layers);
                setMaxSupAtt(maxSupAtt);
            });
    }, [id]);

    const nodeTypes = useMemo(() => ({ defaultNode: GraphNode }), []);
    const edgeTypes = useMemo(() => ({ defaultEdge: GraphEdge }), []);

    let renderPreviousLayer = (_, curNode) => {
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
                            height: 100,
                        },
                    }}
                >
                    <MenuItem>
                        <div className="button-wrapper-layer">
                        How many layers do you want to render? {" "}
                            <label htmlFor="num_layers_rendered">
                                <select
                                    id="renderLayersCount"
                                    value={k}
                                    onChange={(event) => setK(event.target.value)}
                                    style={{ writingMode: "horizontal-tb" }}
                                >
                                    <option value={layers}>All</option>
                                    {(new Array(layers)).fill(undefined).map((_, k) =>k + 1).map(i=><option value={i}>{i}</option>)}
                                </select>
                            </label>
                        </div>
                    </MenuItem>
                    <div style={{ height: "10px" }}></div>
                    <MenuItem>
                        <div className="button-wrapper-att-supp">
                        How many of the top attackers/supporters do you want to show? {" "}
                            <label htmlFor="top_att_supp_showed">
                                <select
                                    id="renderTopAttSupp"
                                    value={top}
                                    onChange={(event) => setTop(event.target.value)}
                                    style={{ writingMode: "horizontal-tb" }}
                                >
                                    <option value={maxSupAtt}>All</option>
                                    {(new Array(maxSupAtt)).fill(undefined).map((_, k) =>k + 1).map(i=><option value={i}>{i}</option>)}
                                </select>
                            </label>
                        </div>
                    </MenuItem>
                </Menu>


                <IconButton 
                    onClick={() => setPopoverAnchor(true)}
                    style={{ zIndex: 100, position: "absolute", top: "0px", right: "20px" }}
                >
                    <HelpOutlineIcon />
                </IconButton>
                <Popover
                    id="help-popover"
                    open={Boolean(popoverAnchor)}
                    anchorEl={popoverAnchor}
                    onClose={() => setPopoverAnchor(false)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    anchorPosition = {{left: "20px", top: "20px"}}
                >
                    <Typography sx={{ p: 2 }}>
                                            INSTRUCTIONS:<br></br><br></br>
                        - Render new layers by clicking on neurons.<br></br>
                        - Use the gear icon in the top left of the screen to select <br></br>
                        the number of layers and neurons to render per click. <br></br>
                        - See neuron and edge information by hovering over individual <br></br>
                        elements.<br></br>
                        - Click on "SHOW CHART" inside the neuron information card to <br></br>
                        visualise the contributions of supporters/attackers as a pie chart.
                        </Typography>
                </Popover>
            </ReactFlow>
        </div>
    );
}
