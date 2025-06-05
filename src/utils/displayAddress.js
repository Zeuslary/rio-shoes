const displayAddress = (address) => {
    return (
        address &&
        (
            address?.houseNumber +
            ' - ' +
            address?.ward +
            ' - ' +
            address?.district +
            ' - ' +
            address?.city
        ).trim()
    );
};

export default displayAddress;
