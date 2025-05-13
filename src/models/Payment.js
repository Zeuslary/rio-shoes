import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const paymentSchema = new Schema(
    {
        code: { type: String, required: true, unique: true }, //Eg: cod, momo
        name: { type: String, required: true },
        description: String,
        status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
    },
    { timestamps: true },
);

export default model('Payment', paymentSchema);
