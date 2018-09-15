var n = {
    /**
     * method
     * @param {Number} max Max value of the range.
     * @param {Number} min Min value of the range.
     * @parma {Number} step Step value of the range.
     * @return {Array<Number>} Number Array of range stepped by step.
     */
    range: function (max, min = 1, step = 1) {
        if (max == 0) {
            return [];
        }

        if (max == min) {
            return [max];
        }

        if (max < min) {
            throw new Error(`max must be larger than min. max = ${max}, min = ${min}`);
        }

        let range = [];
        for (let i = min; i <= max; i += step) {
            range.push(i);
        }
        return range;
    },
    array_shuffle: function (input_array) {
        let result = input_array.sort(() => Math.random() - 0.5);
        return result;
    }
};
export default n;

