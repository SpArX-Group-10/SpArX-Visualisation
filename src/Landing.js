import { useState } from "react";
import DatasetSelection from "./components/DatasetSelection";
import ModelSetup from "./components/ModelSetup";
import TrainingSetup from "./components/TrainingSetup";

function Landing() {
    const [componentsIndex, setComponentsIndex] = useState(0);
    const [inOutShape, setInOutShape] = useState([0, 0]);

    let datasetData = null;
    let model = null;
    let trainingInfo = null;

    const selectedDatasetCallback = (rDatasetData) => {
        datasetData = rDatasetData;
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

    let components = [
        <DatasetSelection selectedDatasetCallback={selectedDatasetCallback} />,
        <ModelSetup inOutShape={inOutShape} modelCallback={modelCallback} />,
        <TrainingSetup trainingSetupCallback={trainingSetupCallback} />,
        <p>SPARKX stuff</p>,
    ];

    return (
        <div>
            <div>Welcome to Sparx!</div>
            {components[componentsIndex]}
        </div>
    );
}

export default Landing;
