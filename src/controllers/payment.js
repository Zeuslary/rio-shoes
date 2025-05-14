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
            message: 'Internal server error',
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid payment ID format.',
            });

        const payment = await Payment.findById(id);

        if (payment)
            return res.status(200).json({
                message: 'Find payment successfully!',
                data: payment,
            });

        return res.status(404).json({
            message: 'Not found your payment!',
        });
    } catch (err) {
        console.error('Error find payment: ', err);
        return res.status(500).json({
            message: 'Internal server error',
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
        return res.status(201).json(saved);
    } catch (err) {
        console.error('Error creating payment: ', err);
        return res.status(500).json({
            message: 'Failed to create payment!',
        });
    }
};

const deleteById = async (req, res) => {
    try {
        const paymentDelete = await Payment.findByIdAndDelete(req.params.id);
        if (paymentDelete)
            return res.status(200).json({
                message: 'Payment deleted successfully!',
                data: paymentDelete,
            });
        return res.status(404).json({
            message: 'Payment not found!',
        });
    } catch (err) {
        console.error('Error delete payment: ', err);
        return res.status(500).json({
            message: 'Failed to delete payment!',
        });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid payment ID format!',
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
                message: 'Payment updated successfully!',
                data: updatePayment,
            });

        return res.status(404).json({
            message: 'Payment not found!',
        });
    } catch (err) {
        console.error('Error update payment: ', err);
        return res.status(500).json({
            message: 'Failed to update payment!',
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
