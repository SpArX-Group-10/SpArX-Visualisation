import { useState } from "react";
import { Optimiser, LossFunction } from "../classes/Enums";
import TrainingInfo from "../classes/TrainingInfo";

const selectorCreator = (name, value, enums, callback) => {
    let options = Object.entries(enums).map(([key, value]) => (
        <option key={name + value} value={value}>
            {key}
        </option>
    ));
    return (
        <div>
            {name + ": "}
            <select value={value} onChange={(e) => callback(e.target.value)}>
                {options}
            </select>
        </div>
    );
};

const numericInputCreator = (name, value, callback, parser) => {
    return (
        <div>
            {name + ": "}
            <input type="number" value={value} onChange={(e) => callback(parser(e.target.value))} />
        </div>
    );
};

function TrainingSetup({ trainingSetupCallback }) {
    const [epochs, setEpochs] = useState(100);
    const [learningRate, setLearningRate] = useState(0.001);
    const [validationSplit, setValidationSplit] = useState(0.2);
    const [optimiser, setOptimiser] = useState(Optimiser.Adam);
    const [lossFunction, setLossFunction] = useState(LossFunction.MeanSquaredError);

    const nextClick = () => {
        let trainingInfo = new TrainingInfo(epochs, learningRate, validationSplit, optimiser, lossFunction);
        trainingSetupCallback(trainingInfo);
    };

    return (
        <div>
            {numericInputCreator("Epochs", epochs, setEpochs, parseInt)}
            {numericInputCreator("Learning Rate", learningRate, setLearningRate, parseFloat)}
            {numericInputCreator("Validation Split", validationSplit, setValidationSplit, parseFloat)}
            {selectorCreator("Optimiser", optimiser, Optimiser, setOptimiser)}
            {selectorCreator("Loss Function", lossFunction, LossFunction, setLossFunction)}
            <button onClick={(_e) => nextClick()}>Next</button>
        </div>
    );
}

export default TrainingSetup;
