const get = (key) => {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : localStorage.setItem(key, '');
};

const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value) || '');
};

const remove = (key) => {
    localStorage.removeItem(key);
};

const clear = () => {
    localStorage.clear();
};

export default {
    get,
    save,
    remove,
    clear,
};
