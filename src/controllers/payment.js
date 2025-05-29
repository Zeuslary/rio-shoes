import mongoose from 'mongoose';
import { Payment } from '../models/index.js';

// Return after fetch data to avoid code continue running unnecessary
//  and preventing multiple responses. Avoid error like:
//  Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
const getAll = async (req, res) => {
    try {
        const payments = await Payment.find();

        return res.status(200).json(payments);
    } catch (err) {
        console.error(`Error fetching payments: ${err}`);
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
            });

        const payment = await Payment.findById(id);

        if (payment)
            return res.status(200).json({
                message: 'Find payment successfully!',
                data: payment,
            });

        return res.status(404).json({
            message: 'Payment not found!',
        });
    } catch (err) {
        console.error('Find payment failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

// When you add new payment, it will appear field _v to tracks the internal document version.
//  you don't need worry about this
const create = async (req, res) => {
    try {
        // Create payment from data user send
        const newPayment = new Payment(req.body);

        // Save into data
        const saved = await newPayment.save();

        return res.status(201).json({
            message: 'Create payment successfully!',
            data: saved,
        });
    } catch (err) {
        console.error('Create payment failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const deleteById = async (req, res) => {
    try {
        const paymentDelete = await Payment.findByIdAndDelete(req.params.id);

        if (paymentDelete)
            return res.status(200).json({
                message: 'Payment delete successfully!',
                data: paymentDelete,
            });

        return res.status(404).json({
            message: 'Payment not found!',
        });
    } catch (err) {
        console.error('Delete payment failed...', err);
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
                message: 'Invalid ID!',
            });

        // Update
        //  return the update document if new = true
        //  default return the original document or null it not found
        const updatePayment = await Payment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (updatePayment)
            return res.status(200).json({
                message: 'Payment update successfully!',
                data: updatePayment,
            });

        return res.status(404).json({
            message: 'Payment not found!',
        });
    } catch (err) {
        console.error('Update payment failed...', err);
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
