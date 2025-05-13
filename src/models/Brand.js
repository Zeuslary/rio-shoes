import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const brandSchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        description: String,
        country: String,
        foundedYear: Number,
        logo: String,
        status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
    },
    { timestamps: true },
);

// model name 'Brand' -> mongoose will auto convert to 'brands' collection
export default model('Brand', brandSchema);
