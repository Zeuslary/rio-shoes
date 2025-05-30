const formatCurrencyVN = (price) => {
    if (price)
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
        });
};
export default formatCurrencyVN;
