import { useState } from "react";
import CSVReader from "react-csv-reader";
import Dataset from "../classes/Dataset";

function FeatureSelection({ headers, featureCallback }) {
    let usableHeaders = headers.slice(0, -1);

    const [selectedFeatures, setSelectedFeatures] = useState(Array(usableHeaders.length).fill(true));

    const handleCheckboxesChange = (i) => {
        let newFeatures = selectedFeatures.slice();
        newFeatures[i] = !newFeatures[i];
        setSelectedFeatures(newFeatures);
    };

    const checkboxes = usableHeaders.map((header, i) => (
        <div key={header + i}>
            <input
                type="checkbox"
                id={header}
                checked={selectedFeatures[i]}
                onChange={() => handleCheckboxesChange(i)}
            />
            <label>{header}</label>
        </div>
    ));

    return (
        <div>
            {checkboxes}
            <button onClick={() => featureCallback(selectedFeatures)}>Next</button>
        </div>
    );
}

function DatasetSelection({ selectedDatasetCallback }) {
    const [dataset, setDataset] = useState([]);
    const [headers, setHeaders] = useState([]);

    const datasetLoaded = (data) => {
        setDataset(data);
        setHeaders(Object.keys(data[0]));
    };

    const featureCallback = (features) => {
        let datasetData = Dataset.constructFilteredData(dataset, headers, features);
        selectedDatasetCallback(datasetData);
    };

    return (
        <div>
            <CSVReader
                accept=".csv,.txt,.data"
                parserOptions={{ header: true, dynamicTyping: true, skipEmptyLines: true }}
                onFileLoaded={datasetLoaded}
            />
            {headers.length !== 0 && <FeatureSelection headers={headers} featureCallback={featureCallback} />}
        </div>
    );
}

export default DatasetSelection;
