class Dataset {
    /**
     *
     * @param {Map<string, any>[]} xData
     * @param {Map<string, any>[]} yData
     * @param {string[]} xHeaders
     * @param {string[]} yHeaders
     */
    constructor(xData, yData, xHeaders, yHeaders) {
        this.xData = xData;
        this.yData = yData;
        this.xHeaders = xHeaders;
        this.yHeaders = yHeaders;
    }

    /**
     *
     * @param {Object[]} dataset
     * @param {string[]} headers
     * @param {boolean[]} features
     * @returns {Dataset}
     */
    static constructFilteredData(dataset, headers, features) {
        // Pre: label is the last column
        features.push(false);
        const xHeaders = headers.filter((_, i) => features[i]);
        const yHeaders = [headers[headers.length - 1]];

        let xData = [];
        let yData = [];

        for (let entry of dataset) {
            let xObject = {};

            for (let i = 0; i < xHeaders.length; i++) {
                xObject[xHeaders[i]] = entry[xHeaders[i]];
            }

            xData.push(xObject);
            yData.push(entry[yHeaders[0]]);
        }

        return new Dataset(xData, yData, xHeaders, yHeaders);
    }
}

export default Dataset;
