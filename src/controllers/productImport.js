import _ from 'lodash';
import mongoose from 'mongoose';
import { ProductImport } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const productImports = await ProductImport.find();
        return res.status(200).json(productImports);
    } catch (err) {
        console.error(`Error fetching product imports: ${err}`);
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
                message: 'Invalid ID',
                data: id,
            });

        const productImport = await ProductImport.findById(id);

        if (productImport)
            return res.status(200).json({
                message: 'Find product import successfully!',
                data: productImport,
            });

        return res.status(404).json({
            message: 'Product import not found!',
        });
    } catch (err) {
        console.error('Find product import failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const create = async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).json({
                message: 'Empty body',
            });

        if (!req.body.productId || !req.body.price || !req.body.quantity)
            return res.status(400).json({
                message: 'Product id, price, quantity is required!',
                data: req.body,
            });

        if (!mongoose.Types.ObjectId.isValid(req.body.productId))
            return res.status(400).json({
                message: 'Product ID is not valid',
                data: req.body,
            });

        const newProductImport = new ProductImport(req.body);

        const saved = await newProductImport.save();

        if (saved)
            return res.status(201).json({
                message: 'Create product import successfully!',
                data: saved,
            });

        return res.status(400).json({
            message: 'Create product import error',
            data: req.body,
        });
    } catch (err) {
        console.error('Create product import failed...', err);
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

        const deleteProductImport = await ProductImport.findByIdAndDelete(id);

        if (deleteProductImport)
            return res.status(200).json({
                message: 'Delete product import successfully!',
                data: deleteProductImport,
            });

        return res.status(400).json({
            message: 'Delete product error',
        });
    } catch (err) {
        console.error('Delete product import failed...', err);
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
                message: 'Invalid ID',
                data: id,
            });

        if (!req.body)
            return res.status(400).json({
                message: 'Empty body!',
            });

        const originalData = await ProductImport.findById(id);

        if (!originalData)
            return res.status(400).json({
                message: 'Product import update not found!',
                data: req.body,
            });

        const isChange = !_.isEqual(_.pick(originalData, Object.keys(req.body)), req.body);

        console.log('Body: ', req.body);
        console.log('Pick: ', _.pick(originalData, Object.keys(req.body)));

        if (!isChange)
            return res.status(400).json({
                message: 'Product Import not modifier!',
                data: originalData,
            });

        const updateData = await ProductImport.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (updateData)
            return res.status(200).json({
                message: 'Update product import successfully!',
                data: updateData,
            });

        return res.status(400).json({
            message: 'Update product import error!',
            data: req.body,
        });
    } catch (err) {
        console.error('Update product import failed...', err);
        return res.status(500).json({
            message: 'Update product import error',
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
