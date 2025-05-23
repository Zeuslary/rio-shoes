const convertAddress = (data, code) => data.find((item) => item.code == code).name;
export default convertAddress;
