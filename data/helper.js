function createArray(start, end) {
    var array = [];

    for (let i = start; i >= end; i--) {
        array.push(i);
    }

    return array;
}

module.exports = {
    createArray,
};
