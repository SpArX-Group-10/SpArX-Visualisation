class SparxInfo {
    /**
     *
     * @param {Clusterer} clusterer
     * @param {Mergerer} merger
     * @param {Number[]} datapoint
     */
    constructor(clusterer, merger, datapoint = null) {
        this.clusterer = clusterer;
        this.merger = merger;
        this.datapoint = datapoint;
    }
}

export default SparxInfo;
