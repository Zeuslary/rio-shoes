import _ from 'lodash';
import mongoose from 'mongoose';
import { Shipping } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const shippings = await Shipping.find();
        return res.status(200).json(shippings);
    } catch (err) {
        console.error(`Error fetching shippings: ${err}`);
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
                message: 'Id is not valid!',
                data: id,
            });

        const shipping = await Shipping.findById(id);

        if (shipping)
            return res.status(200).json({
                message: 'Find shipping success!',
                data: shipping,
            });

        return res.status(404).json({
            message: 'Shipping not found!',
        });
    } catch (err) {
        console.error('Error find data...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const create = async (req, res) => {
    try {
        if (!req.body.name)
            return res.status(400).json({
                message: 'Name is required',
            });

        const newShipping = new Shipping(req.body);

        // Save to database
        const saved = await newShipping.save();

        // After save, return data just create
        return res.status(201).json({
            message: 'Create shipping successfully!',
            data: saved,
        });
    } catch (err) {
        console.error('Create shipping failed...', err);
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
                message: 'Invalid Id',
                data: id,
            });

        const deleteShipping = await Shipping.findByIdAndDelete(id);

        if (deleteShipping)
            return res.status(200).json({
                message: 'Delete shipping successfully!',
                data: deleteShipping,
            });

        return res.status(404).json({
            message: 'Shipping not found',
        });
    } catch (err) {
        console.error('Delete shipping failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.body)
            return res.status(400).json({
                message: 'Empty body',
            });

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid Id',
                data: id,
            });

        // Get document and check is it exist
        const originShipping = await Shipping.findById(id);
        if (!originShipping)
            return res.status(404).json({
                message: 'Shipping not found!',
            });

        // Use pick to create a object with specific key.
        // _.pick(originShipping, Object.keys(req.body)): just get key-value same key with req.body
        const isChange = !_.isEqual(_.pick(originShipping, Object.keys(req.body)), {
            ...req.body,
        });

        console.log('origin', originShipping);

        if (!isChange)
            return res.status(200).json({
                message: 'Shipping not modifier!',
                data: originShipping,
            });

        // Default: findByIdAndUpdate return original and not validate and alway update
        // When use new -> return modified document
        // When use runValidators -> validate field
        const updateShipping = await Shipping.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            message: 'Update shipping successfully!',
            data: updateShipping,
        });
    } catch (err) {
        console.error('Update shipping failed...', err);
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
