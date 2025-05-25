import mongoose from 'mongoose';
import { Order } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (err) {
        console.error(`Fetching all order failed...`, err);
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

        const order = await Order.findById(id);

        if (order)
            return res.status(200).json({
                message: 'Find order successfully!',
                data: order,
            });

        return res.status(404).json({
            message: 'Order not found!',
            data: id,
        });
    } catch (err) {
        console.error('Find order failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

// Create
const create = async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).json({
                message: 'Empty body',
            });

        return res.status(200).json({
            message: 'This feature still not code...',
        });
    } catch (err) {
        console.error('Create order failed...', err);
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

        const deleteOrder = await Order.findByIdAndDelete(id);

        if (deleteOrder)
            return res.status(200).json({
                message: 'Delete order successfully!',
                data: deleteOrder,
            });

        return res.status(400).json({
            message: 'Order not found!',
            data: id,
        });
    } catch (err) {
        console.error('Delete order failed...', err);
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

        if (!req.body)
            return res.status(400).json({
                message: 'Empty body',
            });

        const updateOrder = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (updateOrder)
            return res.status(200).json({
                message: 'Update order successfully!',
                data: updateOrder,
            });

        return res.status(400).json({
            message: 'Update order error',
            data: req.body,
        });
    } catch (err) {
        console.error('Update order failed...', err);
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
