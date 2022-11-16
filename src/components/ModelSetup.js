import { useState } from "react";
import { ActivationFunction } from "../classes/Enums";

import LayerInfo from "../classes/LayerInfo";
import ModelInfo from "../classes/ModelInfo";

function LayerInfoComponent({
    layerInfo,
    layerIndex,
    nueronCountCallback,
    activationCallback,
    removeCallback,
    lockCount = false,
    lockActivation = false,
}) {
    let activationOptions = Object.entries(ActivationFunction).map(([key, value]) => (
        <option key={"activation" + layerIndex + value} value={value}>
            {key}
        </option>
    ));
    return (
        <div>
            Layer: {layerIndex + 1} | Neuron Count:
            <input
                type="number"
                value={layerInfo.nueronCount}
                disabled={lockCount}
                onChange={(e) => nueronCountCallback(layerIndex, e.target.value)}
            />{" "}
            | Activation Function:{" "}
            <select
                value={layerInfo.activationFunction}
                disabled={lockActivation}
                onChange={(e) => activationCallback(layerIndex, e.target.value)}
            >
                {activationOptions}
            </select>
            {!lockCount && !lockActivation && <button onClick={() => removeCallback(layerIndex)}>Remove</button>}
        </div>
    );
}

function ModelSetup({ inOutShape, modelCallback }) {
    const [inputLayerInfo, _] = useState(new LayerInfo(inOutShape[0], ActivationFunction.None));
    const [layerInfos, setLayerInfos] = useState([]);
    const [outputLayerInfo, setOutputLayerInfo] = useState(new LayerInfo(inOutShape[1], ActivationFunction.Sigmoid));

    const addNewInfoLayer = () => {
        let newLayerInfos = [...layerInfos];
        newLayerInfos.push(new LayerInfo(4, ActivationFunction.ReLU));
        setLayerInfos(newLayerInfos);
    };

    const removeCallback = (layerIndex) => {
        let newLayerInfos = [...layerInfos];
        newLayerInfos.splice(layerIndex, 1);
        setLayerInfos(newLayerInfos);
    };

    const nueronCountCallback = (layerIndex, value) => {
        let newLayerInfos = [...layerInfos];
        newLayerInfos[layerIndex].nueronCount = value;
        setLayerInfos(newLayerInfos);
    };

    const activationCallback = (layerIndex, value) => {
        if (layerIndex >= layerInfos.length) {
            setOutputLayerInfo(new LayerInfo(outputLayerInfo.nueronCount, value));
        } else {
            let newLayerInfos = [...layerInfos];
            newLayerInfos[layerIndex].activationFunction = value;
            setLayerInfos(newLayerInfos);
        }
    };

    const nextClick = () => {
        let rModel = new ModelInfo(inputLayerInfo, layerInfos, outputLayerInfo);
        modelCallback(rModel);
    };

    let layerInfoComponents = layerInfos.map((layerInfo, i) => (
        <LayerInfoComponent
            key={"layerInfo" + i}
            layerInfo={layerInfo}
            layerIndex={i}
            nueronCountCallback={nueronCountCallback}
            activationCallback={activationCallback}
            removeCallback={removeCallback}
        />
    ));

    return (
        <div>
            <LayerInfoComponent layerInfo={inputLayerInfo} layerIndex={-1} lockCount={true} lockActivation={true} />
            {layerInfoComponents}
            <button onClick={addNewInfoLayer}>Add new Layer</button>
            <LayerInfoComponent
                layerInfo={outputLayerInfo}
                layerIndex={layerInfos.length}
                lockCount={true}
                activationCallback={activationCallback}
            />
            <button onClick={(_e) => nextClick()}>Next</button>
        </div>
    );
}

export default ModelSetup;
