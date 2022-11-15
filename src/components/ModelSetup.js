import { useState } from "react";
import { ActivationFunction } from "../classes/Enums";

import LayerInfo from "../classes/LayerInfo";

function LayerInfoComponent({ layerInfo, layerIndex, layerInfoCallback, lockCount = false, lockActivation = false }) {
    let activationOptionsValues = ["sigmoid", "tanh", "relu", "softmax"];
    let activationOptions = Object.entries(ActivationFunction).map(([key, value]) => (
        <option value={value}> {key} </option>
    ));
    return (
        <div>
            <div>
                Layer: {layerIndex} | Neuron Count:
                <input type="number" placeholder={layerInfo.nueronCount} disabled={lockCount} /> | Activation Function:
                <select disabled={lockActivation} value={layerInfo.activationFunction}>
                    {activationOptions}
                </select>
            </div>
            {!lockCount && !lockActivation && <button onClick={() => layerInfoCallback(layerIndex)}>Remove</button>}
        </div>
    );
}

function ModelSetup({ inOutShape, ModelCallback }) {
    let modelData = null;

    const [inputLayerInfo, _] = useState(new LayerInfo(inOutShape[0], ActivationFunction.None));
    const [layerInfos, setLayerInfos] = useState([]);
    const [outputLayerInfo, setOutputLayerInfo] = useState(new LayerInfo(inOutShape[1], ActivationFunction.Sigmoid));

    // let layerInfoComponents = layerInfos.map((layerInfo, i) => (
    //     <LayerInfoComponent layerInfo={layerInfo} layerIndex={i} removeLayer={removeLayer} />
    // ));

    return (
        <div>
            <LayerInfoComponent layerInfo={inputLayerInfo} layerIndex={0} lockCount={true} lockActivation={true} />
            {/* {layerInfoComponents} */}
            <LayerInfoComponent
                layerInfo={outputLayerInfo}
                layerIndex={layerInfos.length + 1}
                lockCount={true}
                lockActivation={false}
            />
            <button onClick={() => ModelCallback(modelData)}>Next</button>
        </div>
    );
}

export default ModelSetup;
