import _ from 'lodash';
import mongoose from 'mongoose';

import { UPLOAD_FOLDERS } from '../constants/index.js';
import { Brand } from '../models/index.js';
import deleteFileDiskStorage from '../utils/deleteFileDiskStorage.js';

const getAll = async (req, res) => {
    try {
        const brands = await Brand.find();
        return res.status(200).json(brands); // send status code is 200 and the data base on json format
    } catch (err) {
        console.error(`Error fetching brands: ${err}`);
        return res.status(500).json({
            message: 'Failed to fetch brands',
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid ID!',
                data: id,
            });

        const brand = await Brand.findById(id);

        if (brand)
            return res.status(200).json({
                message: 'Find brand successfully!',
                data: brand,
            });

        return res.status(404).json({
            message: 'Brand not found!',
        });
    } catch (err) {
        console.error('Find brand failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const create = async (req, res) => {
    try {
        const file = req.file; // Get a file client upload
        console.log('File: ', file);

        if (!req.body) {
            if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.brand);
            return res.status(400).json({
                message: 'Empty body!',
            });
        }

        if (!req.body.name || !req.body.slug) {
            if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.brand);

            return res.status(400).json({
                message: 'Name and slug is required',
            });
        }

        // Add logo into body
        if (file) req.body.logo = file.filename;

        const newBrand = new Brand(req.body);

        // Save into database
        const saved = await newBrand.save();

        console.log('Save: ', saved);

        if (saved)
            return res.status(201).json({
                message: 'Create brand successfully!',
                data: newBrand,
            });

        return res.status(400).json({
            message: 'Create brand error!',
        });
    } catch (err) {
        console.error('Create brand failed...', err);
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
                message: 'Invalid ID',
                data: id,
            });

        const brandDelete = await Brand.findByIdAndDelete(id);

        console.log('Brand delete: ', brandDelete);

        if (!brandDelete)
            return res.status(404).json({
                message: 'Brand not found',
                data: id,
            });

        // Delete file logo
        if (brandDelete.logo) deleteFileDiskStorage(brandDelete.logo, UPLOAD_FOLDERS.brand);

        return res.status(200).json({
            message: 'Delete brand successfully!',
            data: brandDelete,
        });
    } catch (err) {
        console.error('Delete brand failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;

        const file = req.file;
        console.log('File: ', file);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            // If exist file client upload -> delete
            if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.brand);

            return res.status(400).json({
                message: 'Invalid ID',
                data: id,
            });
        }

        if (!req.body) {
            // If exist file client upload -> delete
            if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.brand);

            return res.status(400).json({
                message: 'Body is empty!',
            });
        }

        // Add logo into body
        if (file) req.body.logo = file.filename;

        // Get original data
        const originalBrand = await Brand.findById(id);

        // Check original data and new data is same or not
        const isChange = !_.isEqual(_.pick(originalBrand, Object.keys(req.body)), { ...req.body });

        if (!isChange) {
            // If exist file -> delete
            if (file) deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.brand);

            return res.status(200).json({
                message: 'Brand not modifier',
                data: originalBrand,
            });
        }

        const brandUpdate = await Brand.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        console.log('Original: ', originalBrand);
        console.log('Original logo: ', originalBrand.logo);

        // Delete old file logo
        if (file && originalBrand.logo)
            deleteFileDiskStorage(originalBrand.logo, UPLOAD_FOLDERS.brand);

        return res.status(200).json({
            message: 'Update brand successfully!',
            data: brandUpdate,
        });
    } catch (err) {
        console.error('Update brand failed...', err);
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
