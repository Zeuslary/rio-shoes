const convertAddress = (listData, data) => {
    const isCode = !!parseInt(data);

    if (isCode) return listData.find((item) => item.code == data)?.name;
    return listData.find((item) => item.name == data)?.name;
};
export default convertAddress;
