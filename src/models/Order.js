import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const orderSchema = new Schema(
    {
        customerId: { type: Types.ObjectId, required: true, ref: 'Customer' },
        items: [
            {
                id: { type: Types.ObjectId, required: true, ref: 'Product' },
                name: String,
                size: { type: String, required: true },
                color: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true, default: 1 },
            },
        ],
        paymentId: { type: Types.ObjectId, required: true, ref: 'Payment' },
        shippingId: { type: Types.ObjectId, required: true, ref: 'Shipping' },
        summary: {
            subtotal: { type: Number, required: true, min: 0 },
            shippingFee: { type: Number, required: true, default: 0 },
            discount: { type: Number, default: 0 },
            voucherId: { type: Types.ObjectId, ref: 'Voucher' },
            total: { type: Number, required: true, min: 0 },
        },
        address: {
            city: { type: String, required: true },
            district: { type: String, required: true },
            ward: { type: String, required: true },
            houseNumber: String,
        },
        message: String,
        status: {
            type: String,
            enum: ['pending', 'shipping', 'delivered', 'completed', 'cancelled'],
            default: 'pending',
        },
        statusDate: {
            shipping: Date,
            delivered: Date,
            completed: Date,
            cancelled: Date,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

orderSchema.virtual('getAddressDetail').get(function () {
    return `${(
        this.address?.houseNumber + ',' || ''
    ).trim()} ${this.address?.ward + ','} ${this.address?.district + ','} ${this.address?.city}`;
});

export default model('Order', orderSchema);
