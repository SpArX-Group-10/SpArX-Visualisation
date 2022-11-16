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

    /**
     *
     * @returns {string} - The sparks configuration in json.
     */
    asJSON() {
        return JSON.stringify(this);
    }

    static empty() {
        return new SparxInfo(null, null, null);
    }
}

export default SparxInfo;
