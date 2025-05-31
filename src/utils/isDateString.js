const isDateString = (value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return true;
    return false;
};

export default isDateString;
