import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const shippingSchema = new Schema(
    {
        name: { type: String, required: true },
        description: String,
        price: { type: Number, required: true, default: 0 },
        estimateTime: String,
        status: {
            type: String,
            enum: ['active', 'inactive', 'banned'],
            default: 'active',
        },
    },
    { timestamps: true },
);

export default model('Shipping', shippingSchema);
