import axios from 'axios';

const PROVINCES_API_URL = import.meta.env.VITE_PROVINCE_API_URL;

const getProvinces = async () => {
    try {
        const result = await axios.get(PROVINCES_API_URL);

        return result.data;
    } catch (err) {
        console.error('Fetching provinces failed...', err);
        throw err;
    }
};

const getDistricts = async (provinceCode) => {
    try {
        const result = await axios.get(`${PROVINCES_API_URL}/p/${provinceCode}?depth=2`);

        return result.data.districts;
    } catch (err) {
        console.error('Fetching districts failed...', err);
        throw err;
    }
};

const getWards = async (districtCode) => {
    try {
        const result = await axios.get(`${PROVINCES_API_URL}/d/${districtCode}?depth=2`);

        return result.data.wards;
    } catch (err) {
        console.error('Fetching wards failed...', err);
        throw err;
    }
};

const provincesApi = {
    getProvinces,
    getDistricts,
    getWards,
};

export default provincesApi;
