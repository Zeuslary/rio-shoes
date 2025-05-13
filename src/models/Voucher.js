import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const voucherSchema = new Schema(
    {
        code: { type: String, required: true },
        description: String,
        discountType: { type: String, required: true, default: 'fixed' },
        discountValue: { type: Number, required: true, min: 0 },
        minOrder: { type: Number },
        maxDiscountValue: Number,
        startDate: { type: Date, required: true, default: Date.now },
        endDate: { type: Date, required: true },
        quantity: { type: Number, default: 1 },
        usedCount: { type: Number, default: 0 },
        createdBy: { type: Types.ObjectId, ref: 'Admin' },
    },
    { timestamps: true },
);

export default model('Voucher', voucherSchema);
