const removeDuplicateOfArray = (arr = []) => {
    if (!arr) return;

    const result = new Set(arr);

    return [...result];
};

export default removeDuplicateOfArray;
