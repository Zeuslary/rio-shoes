import _ from 'lodash';
import mongoose from 'mongoose';
import { Admin } from '../models/index.js';

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
        console.log('body', req.body);

        if (!req.body)
            return res.status(400).json({
                message: 'Empty body',
            });

        if (!req.body.username || !req.body.password)
            return res.status(400).json({
                message: 'username and password is required',
            });

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

        if (deleteAdmin)
            return res.status(200).json({
                message: 'Delete Admin successfully!',
                data: deleteAdmin,
            });

        return res.status(404).json({
            message: 'Admin not found',
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

        const isChange = !_.isEqual(_.pick(originalAdmin, Object.keys(req.body)), { ...req.body });

        if (!isChange)
            return res.status(200).json({
                message: 'Admin is not change!',
                originalAdmin,
            });

        // option new = true to get document after modifier
        const updateAdmin = await Admin.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

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
