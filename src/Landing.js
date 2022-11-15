import { useState } from "react";
import Dataset from "./classes/Dataset";
import DatasetSelection from "./components/DatasetSelection";
import ModelSetup from "./components/ModelSetup";

function Landing() {
    const [componentsIndex, setComponentsIndex] = useState(0);
    const [inOutShape, setInOutShape] = useState([0, 0]);

    let datasetData = null;
    let model = null;

    const selectedDatasetCallback = (rDatasetData) => {
        setInOutShape(rDatasetData.getInOutShape());
        datasetData = rDatasetData;
        setComponentsIndex(componentsIndex + 1);
    };

    const modelCallback = (rModel) => {
        model = rModel;
        setComponentsIndex(componentsIndex + 1);
    };

    let components = [
        <DatasetSelection selectedDatasetCallback={selectedDatasetCallback} />,
        <ModelSetup inOutShape={inOutShape} modelCallback={modelCallback} />,
        <p>Model train parameters</p>,
    ];

    return (
        <div>
            <div>Welcome to Sparx!</div>
            {components[componentsIndex]}
        </div>
    );
}

export default Landing;
