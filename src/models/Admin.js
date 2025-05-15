import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const adminSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'admin' },
        fullName: {
            firstName: { type: String, default: '' },
            lastName: { type: String, default: '' },
        },
        phone: String,
        email: String,
        avatar: String,
        status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
        lastLogin: Date,
    },
    { timestamps: true },
);

export default model('Admin', adminSchema);
