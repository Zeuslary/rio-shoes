import _ from 'lodash';
import mongoose from 'mongoose';

import { UPLOAD_FOLDERS } from '../constants/index.js';
import deleteFileDiskStorage from '../utils/deleteFileDiskStorage.js';
import Product from '../models/Product.js';
import Brand from '../models/Brand.js';

const getAll = async (req, res) => {
    try {
        const products = await Product.find();

        const brands = await Brand.find().select('_id name');

        // Add field brandName to each product
        products.forEach((product) => {
            const brand = brands.find(
                (brand) => brand._id.toString() === product.brandId.toString(),
            );
            if (brand) {
                product._doc.brandName = brand.name;
            }
        });

        return res.status(200).json(products);
    } catch (err) {
        console.error(`Error fetching products: ${err}`);
        return res.status(500).json({
            message: 'Internal server error',
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
            message: 'Internal server error',
        });
    }
};

const deleteFileStorage = (image, galleryImages = []) => {
    if (image) {
        deleteFileDiskStorage(image[0].filename, UPLOAD_FOLDERS.product);
    }

    if (galleryImages && galleryImages.length > 0) {
        galleryImages.forEach((img) => {
            deleteFileDiskStorage(img.filename, UPLOAD_FOLDERS.product);
        });
    }
};

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

        if (!req.body)
            return res.status(400).json({
                message: 'Empty body',
            });

        if (!req.body.name || !req.body.brandId) {
            if (files) deleteFileStorage(files.image, files.galleryImages);

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
            if (files) deleteFileStorage(files.image, files.galleryImages);

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
            message: 'Internal server error',
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
            message: 'Internal server error',
        });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const files = req.files;
        console.log('Files: ', files);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            if (files) deleteFileStorage(files.image, files.galleryImages);

            return res.status(400).json({
                message: 'Invalid product ID',
                data: id,
            });
        }

        if (!req.body && !files) {
            if (files) deleteFileStorage(files.image, files.galleryImages);

            return res.status(400).json({
                message: 'Empty body',
            });
        }

        const originalProduct = await Product.findById(id);

        if (!originalProduct) {
            if (files) deleteFileStorage(files.image, files.galleryImages);

            return res.status(404).json({
                message: 'Product not found',
                data: id,
            });
        }

        const isChange = !_.isEqual(_.pick(originalProduct, Object.keys(req.body)), req.body);

        if (!isChange && !files) {
            if (files) deleteFileStorage(files.image, files.galleryImages);

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
            // Delete image and gallery old
            if (files && files.image && files.galleryImages) {
                console.log('Delete image and galleryImages');
                deleteImgsStorage(originalProduct.image, originalProduct.galleryImages);
            } else if (files && files.image) {
                console.log('Delete image');
                deleteImgsStorage(originalProduct.image);
            } else if (files && files.galleryImages) {
                console.log('Delete galleryImages');
                deleteImgsStorage('', originalProduct.galleryImages);
            }

            return res.status(200).json({
                message: 'Update product successfully!',
                data: updatedProduct,
            });
        }

        return res.status(400).json({
            message: 'Update product error',
            data: req.body,
        });
    } catch (err) {
        console.error('Update product failed...', err);
        return res.status(500).json({
            message: 'Internal server error',
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
