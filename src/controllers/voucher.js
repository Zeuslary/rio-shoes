import _ from 'lodash';
import mongoose from 'mongoose';

import { Voucher } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const vouchers = await Voucher.find().populate('createdBy', 'fullName');

        // Add field createdByName
        vouchers.forEach(
            (voucher) => (voucher._doc.createdByName = voucher.createdBy?.getFullName),
        );

        return res.status(200).json(vouchers);
    } catch (err) {
        console.error(`Error fetching Voucher: ${err}`);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const getByCode = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) return res.status(400).json({ message: 'Missing voucher code!' });

        const now = new Date();

        const voucher = await Voucher.findOne({
            code,
            status: 'active',
            endDate: { $gt: now },
            $expr: { $lt: ['$usedCount', '$quantity'] },
        });

        // console.log('Voucher: ', voucher);

        if (!voucher)
            return res.status(404).json({
                message: 'Voucher not found or expired!',
            });

        return res.status(200).json({
            message: 'Get voucher successfully!',
            data: voucher,
        });
    } catch (err) {
        console.error(`Error fetching Voucher: ${err}`);
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

        const voucher = await Voucher.findById(id);

        if (voucher)
            return res.status(200).json({
                message: 'Find voucher successfully!',
                data: voucher,
            });

        return res.status(404).json({
            message: 'Voucher not found!',
        });
    } catch (err) {
        console.error('Get voucher failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const create = async (req, res) => {
    try {
        console.log('Body: ', req.body);
        if (!req.body)
            return res.status(400).json({
                message: 'Empty body!',
            });

        if (!req.body.code || !req.body.discountValue || !req.body.endDate)
            return res.status(400).json({
                message: 'Code, Discount value, End date are required',
            });

        const newVoucher = new Voucher(req.body);

        // Save into db
        const saved = newVoucher.save();

        if (saved)
            return res.status(201).json({
                message: 'Create voucher successfully!',
                data: newVoucher,
            });

        return res.status(400).json({
            message: 'Create voucher error!',
        });
    } catch (err) {
        console.error('Create voucher failed...', err);
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

        const deleteVoucher = await Voucher.findByIdAndDelete(id);

        if (deleteVoucher)
            return res.status(200).json({
                message: 'Delete voucher successfully!',
                data: deleteVoucher,
            });

        return res.status(404).json({
            message: 'Voucher not found',
        });
    } catch (err) {
        console.error('Delete voucher failed...', err);
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
                message: 'Invalid ID',
                data: id,
            });

        if (!req.body)
            return res.status(400).json({
                message: 'Empty body',
            });

        const originalVoucher = await Voucher.findById(id);

        if (!originalVoucher)
            return res.status(404).json({
                message: 'Voucher not found',
            });

        const isChange = !_.isEqual(_.pick(originalVoucher, Object.keys(req.body)), {
            ...req.body,
        });

        if (!isChange)
            return res.status(200).json({
                message: 'Voucher not modifier!',
                data: originalVoucher,
            });

        const updateVoucher = await Voucher.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (updateVoucher)
            return res.status(200).json({
                message: 'Update voucher successfully!',
                data: updateVoucher,
            });

        return res.status(404).json({
            message: 'Update voucher error!',
        });
    } catch (err) {
        console.error('Update voucher failed...', err);
        return res.status(500).json({
            message: 'Interval Server Error',
        });
    }
};

export default {
    getAll,
    getByCode,
    getById,
    create,
    deleteById,
    updateById,
};
