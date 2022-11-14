import { useState } from "react";
import Dataset from "./classes/Dataset";

import DatasetSelection from "./components/DatasetSelection";

function Landing() {
    const [componentsIndex, setComponentsIndex] = useState(0);

    let datasetData = null;

    const selectedDatasetCallback = (dataset, headers, features) => {
        datasetData = Dataset.constructFilteredData(dataset, headers, features);
        console.log(datasetData);
        setComponentsIndex(componentsIndex + 1);
    };

    let components = [<DatasetSelection selectedDatasetCallback={selectedDatasetCallback} />, <p>1234</p>];

    return (
        <div>
            <div>Welcome to Sparx!</div>
            {components[componentsIndex]}
        </div>
    );
}

export default Landing;
