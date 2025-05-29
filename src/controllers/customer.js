import _ from 'lodash';
import mongoose from 'mongoose';

import { UPLOAD_FOLDERS } from '../constants/index.js';
import nestObject from '../utils/nestObject.js';
import deleteFileDiskStorage from '../utils/deleteFileDiskStorage.js';
import { Customer } from '../models/index.js';

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
            if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.customer);
            return res.status(400).json({
                message: 'Empty body',
            });
        }

        if (req.body.username) {
            const existingCustomer = await Customer.findOne({ username: req.body.username });
            if (existingCustomer) {
                if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.customer);
                return res.status(400).json({
                    message: 'Username already exists',
                    data: req.body.username,
                });
            }
        }

        if (!isValidBody(req.body)) {
            if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.customer);
            return res.status(400).json({
                message: 'First name, last name, phone, city, district, ward is required!',
                data: req.body,
            });
        }

        // Add file avatar into body
        if (file) req.body.avatar = file.filename;

        console.log('Body ', req.body);

        const newCustomer = new Customer(req.body);

        // Saved customer into db
        const saved = await newCustomer.save();

        if (saved)
            return res.status(201).json({
                message: 'Create customer successfully!',
                data: newCustomer,
            });

        if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.customer);

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
            if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.customer);
            return res.status(400).json({
                message: 'Invalid ID',
                data: id,
            });
        }

        if (!req.body) {
            if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.customer);

            return res.status(400).json({
                message: 'Empty body',
            });
        }

        if (file) req.body.avatar = file.filename;

        const originalCustomer = await Customer.findById(id);

        if (!originalCustomer) {
            if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.customer);
            return res.status(404).json({
                message: 'Voucher not found',
                data: id,
            });
        }

        const isChange = !_.isEqual(_.pick(originalCustomer, Object.keys(req.body)), {
            ...req.body,
        });

        if (!isChange) {
            if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.customer);
            return res.status(200).json({
                message: 'Voucher not modifier!',
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
            message: 'Update voucher successfully!',
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
    create,
    deleteById,
    updateById,
};
