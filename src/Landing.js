import { useState } from "react";
import DatasetSelection from "./components/DatasetSelection";
import ModelSetup from "./components/ModelSetup";
import TrainingSetup from "./components/TrainingSetup";
import SparxSetup from "./components/SparxSetup";
import Dataset from "./classes/Dataset";

function Landing() {
    const [componentsIndex, setComponentsIndex] = useState(0);
    const [inOutShape, setInOutShape] = useState([0, 0]);
    const [dataset, setDataset] = useState(new Dataset([], [], [], []));

    let model = null;
    let trainingInfo = null;
    let sparxInfo = null;

    const selectedDatasetCallback = (rDatasetData) => {
        setDataset(rDatasetData);
        setComponentsIndex(componentsIndex + 1);
        setInOutShape(rDatasetData.getInOutShape());
    };

    const modelCallback = (rModel) => {
        model = rModel;
        setComponentsIndex(componentsIndex + 1);
    };

    const trainingSetupCallback = (rTrainingInfo) => {
        trainingInfo = rTrainingInfo;
        setComponentsIndex(componentsIndex + 1);
    };

    const sparxSetupCallback = (rSparxInfo) => {
        sparxInfo = rSparxInfo;
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
        </div>
    );
}

export default Landing;
