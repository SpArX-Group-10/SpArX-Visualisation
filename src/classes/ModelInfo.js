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

    /**
     *
     * @returns {string} - The layer informations in json.
     */
    asJSON() {
        return JSON.stringify(this.inputLayerInfo + this.layerInfos + this.outputLayerInfo);
    }

    /**
     *
     * @returns {ModelInfo} - Empty modelinfo.
     */
    static empty() {
        return new ModelInfo(null, [], null);
    }
}

export default ModelInfo;
