import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const get = async (path) => {
    try {
        const res = await axios.get(API_BASE_URL + path);
        console.group('Get ', path);
        console.log('Result: ', res);
        console.groupEnd();
        return res.data;
    } catch (err) {
        console.error('Error fetching data!', err);
        throw err;
    }
};

const post = async (path, data) => {
    try {
        const res = await axios.post(API_BASE_URL + path, data);
        console.group('Post ', path);
        console.log('Data: ', data);
        console.log('Result: ', res);
        console.groupEnd();
        return res.data;
    } catch (err) {
        console.error('Error post data!', err);
        throw err;
    }
};

const deleteById = async (path, id) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}${path}/${id}`);
        console.group('Delete ', path);
        console.log('Id: ', id);
        console.log('Result: ', res);
        console.groupEnd();
        return res.data;
    } catch (err) {
        console.error('Error delete data!', err);
        throw err;
    }
};

const putById = async (path, id, data) => {
    try {
        console.group('Delete ', path);
        console.log('Id: ', id);
        console.log('Data: ', data);

        const res = await axios.put(API_BASE_URL + path + '/' + id, data);

        console.log('Result: ', res);
        console.groupEnd();
        return res.data;
    } catch (err) {
        console.error('Error update data!', err);
        throw err;
    }
};

export default {
    get,
    post,
    deleteById,
    putById,
};
export { API_BASE_URL };
