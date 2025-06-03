import axios from 'axios';
import { API_BASE_URL } from '~/constants';
import storage from './storage.js';

// Create custom axios, with config as you want
// baseURL: every request will auto use this prefix
// timeout: max-time of request
//  after 10s if server not response -> will run code catch
const instanceAxios = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Axios interceptor is a function run before request is sent
// config: object default contain info of axios like baseURL, method, url,...
// Bearer: token based auth usually JWT
instanceAxios.interceptors.request.use((config) => {
    const token = storage.get('token');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    // give back config of axios
    return config;
});

const getById = async (path, id) => {
    try {
        const res = await instanceAxios.get(`${path}/${id}`);
        console.group('Get by id ', path);
        console.log('Id: ', id);
        console.log('Result: ', res);
        console.groupEnd();
        return res.data;
    } catch (err) {
        console.error('Get data by Id failed...', err);
    }
};

const getAll = async (path) => {
    try {
        const res = await instanceAxios.get(path);
        console.group('Get ', path);
        console.log('Result: ', res);
        console.groupEnd();
        return res.data;
    } catch (err) {
        console.error('Error fetching data!', err);
        throw err;
    }
};

const getPart = async (path, page) => {
    try {
        const res = await instanceAxios.get(`${path}?page=${page}`);
        console.group('Get part: ', path);
        console.log('Page: ', page);
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
        const res = await instanceAxios.post(path, data);
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
        const res = await instanceAxios.delete(path + '/' + id);
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

        const res = await instanceAxios.put(path + '/' + id, data);

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
            const value = data[key];

            // Handle when value is array
            if (Array.isArray(value)) {
                value.forEach((item) => formData.append(key, item));
            }

            // Handle when value is FileList
            else if (value instanceof FileList) {
                for (let i = 0; i < value.length; i++) {
                    formData.append(key, value[i]);
                }
            } else {
                formData.append(key, value);
            }
        }

        console.group('FormData send to server!');
        for (const key of formData.entries()) {
            console.log(key);
        }
        console.groupEnd();

        const res = await instanceAxios.post(path, formData, {
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
            const value = data[key];

            // Handle when value is array
            if (Array.isArray(value)) {
                value.forEach((item) => formData.append(key, item));
            }

            // Handle when value is FileList
            else if (value instanceof FileList) {
                for (let i = 0; i < value.length; i++) {
                    formData.append(key, value[i]);
                }
            } else {
                formData.append(key, value);
            }
        }

        console.group('Form data send to server:');
        for (const pair of formData.entries()) {
            console.log('pair: ', pair);
        }
        console.groupEnd();

        // Put into server
        const res = await instanceAxios.put(path + '/' + id, formData, {
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

const updatePassword = async (path, id, data) => {
    try {
        console.group('Changing password...');
        console.log('Id: ', id);
        console.log('Data: ', data);

        const res = await instanceAxios.put(`${path}/${id}/change-password`, data);

        console.log('Res: ', res);
        console.groupEnd();

        return res.data;
    } catch (err) {
        console.error('Update password failed...', err);
        throw err;
    }
};

export default {
    getById,
    getAll,
    getPart,
    post,
    deleteById,
    putById,
    postMultipart,
    putMultipart,
    updatePassword,
};
