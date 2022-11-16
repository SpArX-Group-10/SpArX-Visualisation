import { useState } from "react";
import DatasetSelection from "./components/DatasetSelection";
import ModelSetup from "./components/ModelSetup";
import TrainingSetup from "./components/TrainingSetup";
import SparxSetup from "./components/SparxSetup";

import Dataset from "./classes/Dataset";
import ModelInfo from "./classes/ModelInfo";
import TrainingInfo from "./classes/TrainingInfo";
import SparxInfo from "./classes/SparxInfo";

function Landing() {
    const [componentsIndex, setComponentsIndex] = useState(0);
    const [inOutShape, setInOutShape] = useState([0, 0]);

    const [dataset, setDataset] = useState(Dataset.empty());
    const [modelInfo, setModelInfo] = useState(ModelInfo.empty());
    const [trainingInfo, setTrainingInfo] = useState(TrainingInfo.empty());
    const [sparxInfo, setSparxInfo] = useState(SparxInfo.empty());

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
    };

    let components = [
        <DatasetSelection selectedDatasetCallback={selectedDatasetCallback} />,
        <ModelSetup inOutShape={inOutShape} modelCallback={modelCallback} />,
        <TrainingSetup trainingSetupCallback={trainingSetupCallback} />,
        <SparxSetup dataset={dataset} sparxSetupCallback={sparxSetupCallback} />,
        <p>SPARX stuff</p>,
    ];

    return (
        <div>
            <div>Welcome to Sparx!</div>
            {components[componentsIndex]}
            {devMode && (
                <div>
                    <p>{dataset.asJSON()}</p>
                    <p>{modelInfo.asJSON()}</p>
                    <p>{trainingInfo.asJSON()}</p>
                    <p>{sparxInfo.asJSON()}</p>
                </div>
            )}
        </div>
    );
}

export default Landing;
