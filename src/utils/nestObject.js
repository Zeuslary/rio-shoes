const nestObject = (data) => {
    const result = {};

    for (const key in data) {
        const keyArr = key.split('.');

        keyArr.reduce((result, cur, index) => {
            if (index === keyArr.length - 1) {
                return (result[cur] = data[key]);
            } else {
                return (result[cur] = result[cur] || {});
            }
        }, result);
    }

    return result;
};

export default nestObject;
