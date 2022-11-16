const ActivationFunction = {
    None: "none",
    Sigmoid: "sigmoid",
    Tanh: "tanh",
    ReLU: "relu",
    Softmax: "softmax",
};

const Optimiser = {
    SGD: "sgd",
    RMSProp: "rmsprop",
    Adam: "adam",
};

const LossFunction = {
    MeanSquaredError: "meanSquaredError",
    BinaryCrossentropy: "binaryCrossentropy",
    CategoricalCrossentropy: "categoricalCrossentropy",
};

export { ActivationFunction, Optimiser, LossFunction };
