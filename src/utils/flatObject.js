// Return a object key-value after flat
const flatObject = (data, parentKey = '') => {
    const result = {};

    for (const key in data) {
        const value = data[key];
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        // Handle when key-value is normal
        if (typeof value !== 'object') {
            result[fullKey] = value;
        }

        // Handle when key-value is FileList
        else if (value instanceof FileList) {
            const fileList = Array.from(value);
            if (fileList.length === 1) {
                result[fullKey] = fileList[0];
            } else {
                fileList.map((file, index) => {
                    result[`${fullKey}[${index}]`] = file;
                });
            }
        }

        // Handle when key-value is nest object
        else if (typeof value === 'object') {
            const nestObject = flatObject(value, fullKey);

            // Merge neatObject into result object
            Object.assign(result, nestObject);
        }
    }

    // console.log('Object after flat: ', result);
    return result;
};

export default flatObject;
