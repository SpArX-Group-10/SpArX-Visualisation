import { useState } from "react";
import Dataset from "./classes/Dataset";

import DatasetSelection from "./components/DatasetSelection";

function Landing() {
    let datasetData = null;
    const selectedDatasetCallback = (dataset, headers, features) => {
        datasetData = Dataset.constructFilteredData(dataset, headers, features);
    };

    return (
        <div>
            <div>Welcome to Sparx!</div>
            <DatasetSelection selectedDatasetCallback={selectedDatasetCallback} />
        </div>
    );
}

export default Landing;
