import mongoose from 'mongoose';

import nestObject from '../utils/nestObject.js';
import { Order } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customerId', 'fullName email phone')
            .populate('paymentId', 'name')
            .populate('shippingId', 'name');

        console.log('Orders: ', orders);

        // Add field customerName for each order
        // Add field addressDetail for each order
        orders.forEach((order) => {
            order._doc.customerName = order.customerId?.getFullName;
            order._doc.addressDetail = order?.getAddressDetail;
        });

        console.log('Orders: ', orders);

        return res.status(200).json(orders);
    } catch (err) {
        console.error(`Fetching all order failed...`, err);
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
            message: 'Internal Server Error!',
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
            message: 'Internal Server Error!',
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

        const data = nestObject(req.body);

        // Handle status base on status date
        if (data?.statusDate?.cancelled) data.status = 'cancelled';
        else if (data?.statusDate?.completed) data.status = 'completed';
        else if (data?.statusDate?.delivered) data.status = 'delivered';
        else if (data?.statusDate?.shipping) data.status = 'shipping';
        else data.status = 'pending';

        const updateOrder = await Order.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }).populate('customerId', 'fullName email phone');

        if (updateOrder) {
            // Add field customerName and addressDetail for order
            updateOrder._doc.customerName = updateOrder.customerId?.getFullName;
            updateOrder._doc.addressDetail = updateOrder?.getAddressDetail;

            console.log('Body: ', data);

            console.log('Update order: ', updateOrder);

            return res.status(200).json({
                message: 'Update order successfully!',
                data: updateOrder,
            });
        }

        return res.status(400).json({
            message: 'Update order error',
            data: data,
        });
    } catch (err) {
        console.error('Update order failed...', err);
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
