const uniqueObjectFromArray = (arr) => {
    const result = [];

    // Convert each item to JSON, use Set to get unique JSON
    const newArr = new Set(arr.map((item) => item && JSON.stringify(item)));

    // After have array object unique, just parse it into Object
    for (let value of newArr) {
        result.push(JSON.parse(value));
    }

    return result;
};

export default uniqueObjectFromArray;
