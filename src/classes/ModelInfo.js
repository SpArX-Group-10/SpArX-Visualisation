class ModelInfo {
    /**
     *
     * @param {LayerInfo} inputLayerInfo
     * @param {LayerInfo[]} layerInfos
     * @param {LayerInfo} outputLayerInfo
     */
    constructor(inputLayerInfo, layerInfos, outputLayerInfo) {
        this.inputLayerInfo = inputLayerInfo;
        this.layerInfos = layerInfos;
        this.outputLayerInfo = outputLayerInfo;
    }
}
