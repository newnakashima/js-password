var n = {
    /**
     * method
     * @param {Number} max Max value of the range.
     * @param {Number} min Min value of the range.
     * @parma {Number} step Step value of the range.
     * @return {Array<Number>} Number Array of range stepped by step.
     */
    range: function (max, min = 1, step = 1) {
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
        for (let i = input_array.length - 1; i > 0; i--) {
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = input_array[i];
            input_array[i] = input_array[r];
            input_array[r] = tmp;
            return input_array;
        }
    }
};
export default n;

