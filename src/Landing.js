import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DatasetSelection from "./components/DatasetSelection";
import ModelSetup from "./components/ModelSetup";
import TrainingSetup from "./components/TrainingSetup";
import SparxSetup from "./components/SparxSetup";

import Dataset from "./classes/Dataset";
import ModelInfo from "./classes/ModelInfo";
import TrainingInfo from "./classes/TrainingInfo";
import SparxInfo from "./classes/SparxInfo";

const API_ENDPOINT = "http://localhost:5000/api/sparx";

function Landing() {
    const [componentsIndex, setComponentsIndex] = useState(0);
    const [inOutShape, setInOutShape] = useState([0, 0]);

    const [dataset, setDataset] = useState(Dataset.empty());
    const [modelInfo, setModelInfo] = useState(ModelInfo.empty());
    const [trainingInfo, setTrainingInfo] = useState(TrainingInfo.empty());
    const [sparxInfo, setSparxInfo] = useState(SparxInfo.empty());

    const navigate = useNavigate();

    const devMode = false;

    const selectedDatasetCallback = (rDatasetData) => {
        setDataset(rDatasetData);
        setComponentsIndex(componentsIndex + 1);
        setInOutShape(rDatasetData.getInOutShape());
    };

    const modelCallback = (rModel) => {
        setModelInfo(rModel);
        setComponentsIndex(componentsIndex + 1);
    };

    const trainingSetupCallback = (rTrainingInfo) => {
        setTrainingInfo(rTrainingInfo);
        setComponentsIndex(componentsIndex + 1);
    };

    const sparxSetupCallback = (rSparxInfo) => {
        setSparxInfo(rSparxInfo);
        setComponentsIndex(componentsIndex + 1);

        sendToServer(rSparxInfo);
    };

    const sendToServer = (sparxInfo) => {
        // sparxs info is passed in because otherwise it won't be updated in time
        const data = {
            dataset: dataset,
            modelInfo: modelInfo,
            trainingInfo: trainingInfo,
            sparxInfo: sparxInfo,
        };

        fetch(API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => navigate("/visualisation", { state: { graphJSON: data } }));
    };

    let components = [
        <DatasetSelection selectedDatasetCallback={selectedDatasetCallback} />,
        <ModelSetup inOutShape={inOutShape} modelCallback={modelCallback} />,
        <TrainingSetup trainingSetupCallback={trainingSetupCallback} />,
        <SparxSetup dataset={dataset} sparxSetupCallback={sparxSetupCallback} />,
        <p>Waiting for server to respond</p>,
    ];

    return (
        <div>
            <div>Welcome to Sparx!</div>
            {components[componentsIndex]}
            {devMode && (
                <div>
                    <p>{JSON.stringify(dataset)}</p>
                    <p>{JSON.stringify(modelInfo)}</p>
                    <p>{JSON.stringify(trainingInfo)}</p>
                    <p>{JSON.stringify(sparxInfo)}</p>
                </div>
            )}
        </div>
    );
}

export default Landing;
