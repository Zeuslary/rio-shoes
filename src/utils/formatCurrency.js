const formatCurrencyVN = (price) => {
    if (price || price === 0)
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
        });
};
export default formatCurrencyVN;
