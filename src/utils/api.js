import axios from 'axios';
import { API_BASE_URL } from '~/constants';

const getAll = async (path) => {
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
        console.group('Put ', path);
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

// ---------Multipart/form-data-------------

// We need use formData to post data as multipart/form-data
// formData need be a FormData
const postMultipart = async (path, data) => {
    try {
        // Create FormData
        const formData = new FormData();

        // Save key-value into formData
        for (const key in data) {
            formData.append(key, data[key]);
        }

        console.group('FormData send to server');
        for (const key of formData.entries()) {
            console.log(key);
        }
        console.groupEnd();

        const res = await axios.post(API_BASE_URL + path, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.group('Post multipart: ', path);
        console.log('Result: ', res);
        console.groupEnd();

        return res.data;
    } catch (err) {
        console.error('Error post data multipart...', err);
        throw err;
    }
};

const putMultipart = async (path, id, data) => {
    try {
        const formData = new FormData();
        console.group('Updating...');
        console.log('Data: ', data);
        console.log('ID: ', id);

        // Save data into formData
        for (const key in data) {
            formData.append(key, data[key]);
        }

        console.group('Form data send to server:');
        for (const pair of formData.entries()) {
            console.log('pair: ', pair);
        }
        console.groupEnd();

        // Put into server
        const res = await axios.put(API_BASE_URL + path + '/' + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Res: ', res);
        console.groupEnd();

        return res.data;
    } catch (err) {
        console.error('Update data failed...', err);
        throw err;
    }
};

export default {
    getAll,
    post,
    deleteById,
    putById,
    postMultipart,
    putMultipart,
};
