import _ from 'lodash';
import mongoose from 'mongoose';

import { UPLOAD_FOLDERS } from '../constants/index.js';
import deleteFileDiskStorage from '../utils/deleteFileDiskStorage.js';
import Product from '../models/Product.js';

const getAll = async (req, res) => {
    try {
        const products = await Product.find().populate('brandId', 'name');

        return res.status(200).json(products);
    } catch (err) {
        console.error(`Error fetching products: ${err}`);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const getAllMinimal = async (req, res) => {
    try {
        const products = await Product.find().select('name');

        console.log('Product ', products);
        return res.status(200).json(products);
    } catch (err) {
        console.error('Fetching data failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product ID',
                data: id,
            });
        }

        const product = await Product.findById(id);

        if (product)
            return res.status(200).json({
                message: 'Find product successfully!',
                data: product,
            });

        return res.status(404).json({
            message: 'Product not found',
            data: id,
        });
    } catch (err) {
        console.error('Get product failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

// Function delete all files just upload
const deleteFileJustUpload = (files) => {
    // If exist files -> start delete files
    if (files) {
        const { image, galleryImages } = files;

        // Delete img first
        if (files.image) {
            deleteFileDiskStorage(image[0].filename, UPLOAD_FOLDERS.product);
        }

        // Delete gallery imgs
        if (files.galleryImages && galleryImages.length > 0) {
            galleryImages.forEach((img) => {
                deleteFileDiskStorage(img.filename, UPLOAD_FOLDERS.product);
            });
        }
    }
};

// Function delete imgs inside disk storage
const deleteImgsStorage = (image, galleryImages = []) => {
    if (image) {
        deleteFileDiskStorage(image, UPLOAD_FOLDERS.product);
    }

    if (galleryImages && galleryImages.length > 0) {
        galleryImages.forEach((img) => {
            deleteFileDiskStorage(img, UPLOAD_FOLDERS.product);
        });
    }
};

const create = async (req, res) => {
    try {
        const files = req.files;

        console.log('Files: ', files);
        console.log('File image: ', files.image);
        console.log('File galleryImages: ', files.galleryImages);

        if (!req.body) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Empty body',
            });
        }

        if (!req.body.name || !req.body.brandId) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Name, brandId are required',
                data: req.body,
            });
        }

        // Add image and galleryImages to req.body
        if (files) {
            if (files.image && files.image.length > 0) {
                req.body.image = files.image[0].filename;
            }

            if (files.galleryImages && files.galleryImages.length > 0) {
                req.body.galleryImages = files.galleryImages.map((img) => img.filename);
            }
        }

        console.log('Body: ', req.body);

        const newProduct = await new Product(req.body).save();

        console.log('New product: ', newProduct);

        if (!newProduct) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Create product error',
                data: req.body,
            });
        }

        return res.status(200).json({
            message: 'Create product successfully!',
            data: newProduct,
        });
    } catch (err) {
        console.error('Create product failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product ID',
                data: id,
            });
        }

        const product = await Product.findByIdAndDelete(id);

        if (product) {
            // Delete image and galleryImages from disk
            deleteImgsStorage(product.image, product.galleryImages);

            return res.status(200).json({
                message: 'Delete product successfully!',
                data: product,
            });
        }

        return res.status(404).json({
            message: 'Product not found',
            data: id,
        });
    } catch (err) {
        console.error('Delete product failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const files = req.files;
        console.log('Files: ', files);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Invalid product ID',
                data: id,
            });
        }

        if (!req.body && !files) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Empty body',
            });
        }

        const originalProduct = await Product.findById(id);

        if (!originalProduct) {
            deleteFileJustUpload(files);

            return res.status(404).json({
                message: 'Product not found',
                data: id,
            });
        }

        const isChange = !_.isEqual(
            _.pick(originalProduct, Object.keys(req.body)),
            req.body,
        );

        if (!isChange && !files) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Product not modified',
                data: req.body,
            });
        }

        // Add image and galleryImages to req.body
        if (files) {
            if (files.image && files.image.length > 0) {
                req.body.image = files.image[0].filename;
            }

            if (files.galleryImages && files.galleryImages.length > 0) {
                req.body.galleryImages = files.galleryImages.map((img) => img.filename);
            }
        }

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (updatedProduct) {
            // If upload both image && galleryImage => delete old img corresponding
            if (files && files.image && files.galleryImages) {
                console.log('Delete image and galleryImages');

                deleteImgsStorage(originalProduct.image, originalProduct.galleryImages);
            }

            // If just img change  -> delete old img inside image
            else if (files && files.image) {
                console.log('Delete image');

                deleteImgsStorage(originalProduct.image);
            }

            // If just galleryImages change  -> delete old img inside galleryImages
            else if (files && files.galleryImages) {
                console.log('Delete galleryImages');

                deleteImgsStorage('', originalProduct.galleryImages);
            }

            return res.status(200).json({
                message: 'Update product successfully!',
                data: updatedProduct,
            });
        }

        // When update error, need delete file upload
        deleteFileJustUpload(files);

        return res.status(400).json({
            message: 'Update product error',
            data: req.body,
        });
    } catch (err) {
        console.error('Update product failed...', err);
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
