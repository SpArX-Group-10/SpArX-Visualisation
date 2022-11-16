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

const Clusterer = {
    KMeans: "kmeans",
    Aggromerative: "aggromerative",
};

const Merger = {
    Global: "global",
    Local: "local",
};

export { ActivationFunction, Optimiser, LossFunction, Clusterer, Merger };
