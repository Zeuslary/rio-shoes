const isToken = (token) => {
    if (token && typeof token === 'string') return true;
    return false;
};

const isExpired = (token) => {
    const now = Math.floor(Date.now() / 1000);

    if (token.exp < now) return true;

    return false;
};

export default {
    isToken,
    isExpired,
};
