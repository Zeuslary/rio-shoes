import _ from 'lodash';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { UPLOAD_FOLDERS } from '../constants/index.js';
import nestObject from '../utils/nestObject.js';
import deleteFileDiskStorage from '../utils/deleteFileDiskStorage.js';

import { Customer, Order } from '../models/index.js';

const deleteFileJustUpload = (file) => {
    if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.customer);
};

const getAll = async (req, res) => {
    try {
        const customers = await Customer.find();

        return res.status(200).json(customers);
    } catch (err) {
        console.error(`Error fetching Customers: ${err}`);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid ID',
                data: id,
            });

        const customer = await Customer.findById(id);

        if (customer)
            return res.status(200).json({
                message: 'Find customer successfully!',
                data: customer,
            });

        return res.status(404).json({
            message: 'Customer not found!',
        });
    } catch (err) {
        console.error('Get customer failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const uniqueUserName = async (req, res) => {
    try {
        console.log('Body: ', req.body);

        if (!req.body)
            return res.status(400).json({
                message: 'Empty body!',
            });

        if (!req.body?.username)
            return res.status(400).json({
                message: 'Username is required!',
                data: req.body,
            });

        const customer = await Customer.find({
            username: req.body.username,
        });

        console.log('Customer: ', customer);

        if (customer && customer.length > 0)
            return res.status(400).json({
                message: 'Username already exists!',
                data: req.body,
            });

        return res.status(200).json({
            message: 'Check unique username successfully!',
            data: req.body,
        });
    } catch (err) {
        console.error('Check unique username failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const login = async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).json({
                message: 'Empty body!',
            });

        const username = req.body?.username;
        const password = req.body?.password;

        // console.log('Username: ', username);
        // console.log('Password: ', password);

        if (!username || !password)
            return res.status(400).json({
                message: 'Username and password are required!',
                data: req.body,
            });

        const customer = await Customer.findOne({
            username,
            password,
        });

        // console.log('Customer: ', customer);

        if (customer) {
            customer.password = '';

            const customerToken = jwt.sign(
                {
                    ...customer,
                },
                process?.env?.JWT_SECRET,
                {
                    expiresIn: process?.env?.JWT_EXPIRATION,
                },
            );

            // console.log('Customer token: ', customerToken);

            // Delete password
            delete customer._doc.password;

            return res.status(200).json({
                message: 'Login successfully!',
                data: customer,
                token: customerToken,
            });
        }

        return res.status(400).json({
            message: 'Username or password invalid!',
        });
    } catch (err) {
        console.error('Login failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, newPassword } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid ID',
                data: id,
            });

        if (!password || !newPassword)
            return res.status(400).json({
                message: 'Password and New password are required!',
            });

        const customer = await Customer.findById(id);

        if (!customer)
            return res.status(404).json({
                message: 'Customer not found!',
            });

        if (customer.password != req.body.password)
            return res.status(400).json({
                message: 'Wrong password!',
            });

        customer.password = newPassword;

        const saved = await customer.save();

        console.log('Saved: ', saved);

        // Delete password in res
        delete saved._doc.password;

        if (saved)
            return res.status(200).json({
                message: 'Update password successfully!',
                data: saved,
            });

        return res.status(400).json({
            message: 'Update password error!',
        });
    } catch (err) {
        console.error('Update password failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const isValidBody = (body) => {
    if (
        body?.fullName?.firstName &&
        body?.fullName?.lastName &&
        body?.phone &&
        body?.address?.city &&
        body?.address?.district &&
        body?.address?.ward
    )
        return true;
    return false;
};

const create = async (req, res) => {
    try {
        const file = req.file;

        console.log('File client upload: ', file);
        req.body = nestObject(req.body);

        if (!req.body) {
            deleteFileJustUpload(file);

            return res.status(400).json({
                message: 'Empty body',
            });
        }

        // Handle unique username
        if (req.body.username) {
            const existingCustomer = await Customer.findOne({
                username: req.body.username,
            });

            if (existingCustomer) {
                deleteFileJustUpload(file);

                return res.status(400).json({
                    message: 'Username already exists',
                    data: req.body.username,
                });
            }
        }

        if (!isValidBody(req.body)) {
            deleteFileJustUpload(file);
            return res.status(400).json({
                message:
                    'First name, last name, phone, city, district, ward is required!',
                data: req.body,
            });
        }

        // Add file avatar into body
        if (file) req.body.avatar = file.filename;

        console.log('Body ', req.body);

        const newCustomer = new Customer(req.body);

        // Saved customer into db
        const saved = await newCustomer.save();

        // Delete password before send back client
        delete newCustomer.password;

        // Create token for this customer
        const customerToken = jwt.sign(
            {
                ...newCustomer,
            },
            process?.env.JWT_SECRET,
            {
                expiresIn: process?.env?.JWT_EXPIRATION,
            },
        );

        console.log('Customer token: ', customerToken);

        if (saved)
            return res.status(201).json({
                message: 'Create customer successfully!',
                data: newCustomer,
                token: customerToken,
            });

        deleteFileJustUpload(file);

        return res.status(400).json({
            message: 'Create customer error',
        });
    } catch (err) {
        console.error('Create customer failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid ID',
                data: id,
            });

        // If exist order -> can't delete customer
        const orderCustomer = await Order.find({
            customerId: id,
        });

        console.log('CustomerId: ', id);
        console.log('Customer: ', orderCustomer);
        console.log('Customer: ', orderCustomer.length <= 0);

        if (orderCustomer && orderCustomer.length >= 1)
            return res.status(400).json({
                message: "Can't delete customer has order!",
                data: id,
            });

        const deleteCustomer = await Customer.findByIdAndDelete(id);

        if (deleteCustomer) {
            if (deleteCustomer.avatar)
                deleteFileDiskStorage(deleteCustomer.avatar, UPLOAD_FOLDERS.customer);

            return res.status(200).json({
                message: 'Delete customer successfully!',
                data: deleteCustomer,
            });
        }

        return res.status(404).json({
            message: 'Customer not found!',
            data: id,
        });
    } catch (err) {
        console.error('Delete customer failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            deleteFileJustUpload(file);
            return res.status(400).json({
                message: 'Invalid ID',
                data: id,
            });
        }

        if (!req.body) {
            deleteFileJustUpload(file);

            return res.status(400).json({
                message: 'Empty body',
            });
        }

        if (file) req.body.avatar = file.filename;

        const originalCustomer = await Customer.findById(id);

        if (!originalCustomer) {
            deleteFileJustUpload(file);
            return res.status(404).json({
                message: 'Customer not found',
                data: id,
            });
        }

        const isChange = !_.isEqual(_.pick(originalCustomer, Object.keys(req.body)), {
            ...req.body,
        });

        if (!isChange) {
            deleteFileJustUpload(file);
            return res.status(200).json({
                message: 'Customer not modifier!',
                data: originalCustomer,
            });
        }

        const updateCustomer = await Customer.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (file && originalCustomer.avatar)
            deleteFileDiskStorage(originalCustomer.avatar, UPLOAD_FOLDERS.customer);

        return res.status(200).json({
            message: 'Update customer successfully!',
            data: updateCustomer,
        });
    } catch (err) {
        console.error('Update customer failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

export default {
    getAll,
    getById,
    uniqueUserName,
    updatePassword,
    login,
    create,
    deleteById,
    updateById,
};
