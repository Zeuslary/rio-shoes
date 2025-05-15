const formatCurrencyVN = (price) =>
    price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'VND',
    });

export default formatCurrencyVN;
