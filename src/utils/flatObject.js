// Return a object key-value after flat
const flatObject = (data, parentKey = '') => {
    const result = {};

    for (const key in data) {
        const value = data[key];
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        // Handle when key-value is normal
        if (
            typeof value !== 'object' ||
            Array.isArray(value) ||
            value instanceof FileList
        ) {
            result[fullKey] = value;
        }

        // Format date into ISOString
        else if (value instanceof Date) {
            result[fullKey] = new Date(value).toISOString();
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
