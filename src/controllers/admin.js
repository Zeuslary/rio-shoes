import _ from 'lodash';
import mongoose from 'mongoose';

import { Admin } from '../models/index.js';
import { UPLOAD_FOLDERS } from '../constants/index.js';
import deleteFileDiskStorage from '../utils/deleteFileDiskStorage.js';

const getAll = async (req, res) => {
    try {
        const admins = await Admin.find();
        return res.status(200).json(admins);
    } catch (err) {
        console.error(`Error fetching admins: ${err}`);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Id not valid!',
                data: id,
            });

        const admin = await Admin.findById(id);

        if (admin)
            return res.status(200).json({
                message: 'Find admin successfully!',
                data: admin,
            });

        return res.status(404).json({ message: 'Admin not found!' });
    } catch (err) {
        console.error('Error find data...', err);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const create = async (req, res) => {
    try {
        console.log('Req: ', req);
        console.log('body', req.body);
        console.log('file', req.file); // Get file from request user.

        if (!req.body)
            return res.status(400).json({
                message: 'Empty body',
            });

        if (!req.body.username || !req.body.password)
            return res.status(400).json({
                message: 'username and password is required',
            });

        // Add avatar path to the body before saving
        if (req.file) {
            // Add avatar = Link file user upload and you save this into folder uploads/avatars
            req.body.avatar = req.file.filename;
        }

        const newAdmin = new Admin(req.body);

        // Put new admin to db
        const saved = await newAdmin.save();

        if (saved)
            return res.status(201).json({
                message: 'Create admin successfully!',
                data: newAdmin,
            });

        return res.status(400).json({
            message: 'Error create admin!',
        });
    } catch (err) {
        console.error('Create admin failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid id',
                data: id,
            });

        const deleteAdmin = await Admin.findByIdAndDelete(id);

        if (!deleteAdmin)
            return res.status(404).json({
                message: 'Admin not found',
            });

        // Delete file from local disk
        if (deleteAdmin.avatar) {
            deleteFileDiskStorage(deleteAdmin.avatar, UPLOAD_FOLDERS.admin);
        }

        return res.status(200).json({
            message: 'Delete Admin successfully!',
            data: deleteAdmin,
        });
    } catch (err) {
        console.error('Error delete admin...', err);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;

        console.log('Req: ', req);
        console.log('Body: ', req.body);
        console.log('File: ', req.file);

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid Id',
                data: id,
            });

        const originalAdmin = await Admin.findById(id);
        if (!originalAdmin)
            return res.status(404).json({
                message: 'Admin not found!',
            });

        // Add update avatar into data
        if (req.file) req.body.avatar = req.file.filename;
        console.log('Body after add avatar: ', req.body);

        const isChange = !_.isEqual(_.pick(originalAdmin, Object.keys(req.body)), { ...req.body });
        if (!isChange)
            return res.status(200).json({
                message: 'Admin is not change!',
                data: originalAdmin,
            });

        // option new = true to get document after modifier
        const updateAdmin = await Admin.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        // After update, delete old img
        if (originalAdmin.avatar) deleteFileDiskStorage(originalAdmin.avatar, UPLOAD_FOLDERS.admin);

        return res.status(200).json({
            message: 'Update admin successfully!',
            data: updateAdmin,
        });
    } catch (err) {
        console.error('Error update admin...', err);
        return res.status(500).json({
            message: 'Internal Server Error',
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
