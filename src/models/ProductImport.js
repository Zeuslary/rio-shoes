import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const productImportSchema = new Schema(
    {
        productId: { type: Types.ObjectId, required: true, ref: 'Product' },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 0 },
        importDate: { type: Date, default: Date.now },
        createdBy: { type: Types.ObjectId, ref: 'Admin' },
    },
    { timestamps: true },
);

// Custom collection name
export default model('ProductImport', productImportSchema, 'productImports');
