import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const customerSchema = new Schema(
    {
        username: { type: String, unique: true },
        password: String,
        role: { type: String, default: 'customer' },
        fullName: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        },
        phone: { type: String, required: true },
        email: String,
        address: {
            city: { type: String, required: true },
            district: { type: String, required: true },
            ward: { type: String, required: true },
            houseNumber: String,
        },
        avatar: String,
        dateOfBirth: Date,
        lastLogin: Date,
        lastOrderDate: Date,
        status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
    },
    { timestamps: true },
);

export default model('Customer', customerSchema);
