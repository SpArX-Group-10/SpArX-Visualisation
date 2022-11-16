import { useState } from "react";
import { selectorCreator } from "../classes/Utility";
import { Clusterer, Merger } from "../classes/Enums";
import SparxInfo from "../classes/SparxInfo";

function DatapointInputs({ datapoint, xHeaders, dataPointCallback }) {
    const elements = datapoint.map((value, index) => (
        <div key={"datapoint" + index}>
            <label>{xHeaders[index]} : </label>
            <input type="number" value={value} onChange={(e) => dataPointCallback(e.target.value, index)} />
        </div>
    ));

    return <div>{elements}</div>;
}

function SparxSetup({ dataset, sparxSetupCallback }) {
    const [clusterer, setClusterer] = useState(Clusterer.KMeans);
    const [merger, setMerger] = useState(Merger.Local);
    const [datapoint, setDatapoint] = useState(dataset.getRandomXDatapoint());

    const nextClick = () => {
        let sparxInfo = new SparxInfo(clusterer, merger, datapoint);
        sparxSetupCallback(sparxInfo);
    };

    // change a singel datapoint
    const dataPointCallback = (value, index) => {
        let newDatapoint = [...datapoint];
        newDatapoint[index] = value;
        setDatapoint(newDatapoint);
    };

    return (
        <div>
            {selectorCreator("Clusterer", clusterer, Clusterer, setClusterer)}
            {selectorCreator("Merger", merger, Merger, setMerger)}
            {merger === Merger.Local && (
                <DatapointInputs
                    datapoint={datapoint}
                    xHeaders={dataset.xHeaders}
                    dataPointCallback={dataPointCallback}
                />
            )}
            <button onClick={(_e) => nextClick()}>Next</button>
        </div>
    );
}

export default SparxSetup;
