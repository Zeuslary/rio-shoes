import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const customerSchema = new Schema(
    {
        username: { type: String, unique: true },
        password: String,
        role: { type: String, default: 'customer' },
        fullName: {
            firstName: { type: String, required: true },
            lastName: { type: String },
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
        orderCount: { type: Number, default: 0 },
        totalSpent: { type: Number, default: 0 },
        lastLogin: { type: Date, default: null },
        lastOrderDate: { type: Date, default: null },
        status: {
            type: String,
            enum: ['active', 'inactive', 'banned'],
            default: 'active',
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// Add virtual method for Customer
customerSchema.virtual('getFullName').get(function () {
    return (
        (this.fullName?.firstName || '') +
        ' ' +
        (this.fullName?.lastName || '')
    ).trim();
});

export default model('Customer', customerSchema);
