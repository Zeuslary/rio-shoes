const removeDuplicateOfObject = (data) => {
    const result = [];
    const brandIds = {};

    data.map((item) => {
        if (!brandIds[item.id]) result.push(item);
        brandIds[item.id] = true;
    });

    return result;
};

export default removeDuplicateOfObject;
