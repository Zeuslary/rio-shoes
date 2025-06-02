import _ from 'lodash';
import mongoose from 'mongoose';

import deleteFileDiskStorage from '../utils/deleteFileDiskStorage.js';
import { UPLOAD_FOLDERS } from '../constants/index.js';
import { Brand } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const brands = await Brand.find();

        // send status code is 200 and the data base on json format
        return res.status(200).json(brands);
    } catch (err) {
        console.error(`Error fetching brands: ${err}`);
        return res.status(500).json({
            message: 'Failed to fetch brands',
        });
    }
};

const getAllMinimal = async (req, res) => {
    try {
        const brands = await Brand.find().select('name slug logo');

        return res.status(200).json({
            message: 'Fetching minimal brands successfully!',
            data: brands,
        });
    } catch (err) {
        console.error('Fetching minimal brands failed...', err);

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
            message: 'Internal Server Error!',
        });
    }
};

const deleteFileJustUpload = (file) => {
    if (file) {
        deleteFileDiskStorage(file.filename, UPLOAD_FOLDERS.brand);
    }
};

const create = async (req, res) => {
    try {
        const logoFile = req.file; // Get a file client upload
        console.log('File: ', logoFile);

        if (!req.body) {
            deleteFileJustUpload(logoFile);

            return res.status(400).json({
                message: 'Empty body!',
            });
        }

        if (!req.body.name || !req.body.slug) {
            deleteFileJustUpload(logoFile);

            return res.status(400).json({
                message: 'Name and slug is required',
            });
        }

        // Add logo into body
        if (logoFile) req.body.logo = logoFile.filename;

        const newBrand = new Brand(req.body);

        // Save into database
        const saved = await newBrand.save();

        console.log('Save: ', saved);

        if (saved)
            return res.status(201).json({
                message: 'Create brand successfully!',
                data: newBrand,
            });

        // Create error -> delete file just upload
        deleteFileJustUpload(logoFile);

        return res.status(400).json({
            message: 'Create brand error!',
        });
    } catch (err) {
        console.error('Create brand failed...', err);
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

        const brandDelete = await Brand.findByIdAndDelete(id);

        console.log('Brand delete: ', brandDelete);

        if (!brandDelete)
            return res.status(404).json({
                message: 'Brand not found',
                data: id,
            });

        // Delete file logo
        if (brandDelete.logo)
            deleteFileDiskStorage(brandDelete.logo, UPLOAD_FOLDERS.brand);

        return res.status(200).json({
            message: 'Delete brand successfully!',
            data: brandDelete,
        });
    } catch (err) {
        console.error('Delete brand failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;

        const logoFile = req.file;
        console.log('File: ', logoFile);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            // If exist logoFile client upload -> delete
            deleteFileJustUpload(logoFile);

            return res.status(400).json({
                message: 'Invalid ID',
                data: id,
            });
        }

        if (!req.body) {
            // If exist logoFile client upload -> delete
            deleteFileJustUpload(logoFile);

            return res.status(400).json({
                message: 'Body is empty!',
            });
        }

        // Add logo into body
        if (logoFile) req.body.logo = logoFile.filename;

        // Get original data
        const originalBrand = await Brand.findById(id);

        // Check original data and new data is same or not
        const isChange = !_.isEqual(_.pick(originalBrand, Object.keys(req.body)), {
            ...req.body,
        });

        if (!isChange) {
            // If exist logoFile -> delete
            deleteFileJustUpload(logoFile);

            return res.status(200).json({
                message: 'Brand not modifier!',
                data: originalBrand,
            });
        }

        const brandUpdate = await Brand.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        // Delete old logoFile logo
        if (logoFile && originalBrand.logo)
            deleteFileDiskStorage(originalBrand.logo, UPLOAD_FOLDERS.brand);

        return res.status(200).json({
            message: 'Update brand successfully!',
            data: brandUpdate,
        });
    } catch (err) {
        console.error('Update brand failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

export default {
    getAll,
    getAllMinimal,
    getById,
    create,
    deleteById,
    updateById,
};
