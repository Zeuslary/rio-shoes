import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

// [String]: a array contain value is string
// ref is used to create relationships between collection (look like foreign key in SQL)
// enum: to validator value
// timestamps option: set it true, Mongoose will add 2 prop
//  createdAt, and updatedAt auto

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: String,
        brandId: { type: Types.ObjectId, ref: 'Brand', required: true },
        category: String, // Eg: shoes, sneakers
        type: String, // Eg: sport, lifestyle
        style: String, // Eg: sport, lifestyle
        material: [String],
        design: String, // Eg: low-top, high-top
        releaseYear: Number,
        origin: String, // Eg: VietNam, TrungQuoc
        colors: [String],
        sizes: [String],
        stock: Number,
        sold: Number,
        originalPrice: Number,
        newPrice: Number,
        image: String,
        galleryImages: [String],
        tag: String, // Eg: hot, new
        fakeHot: Boolean, // Desc: Sometime you want to fake that this product is hot
        status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' }, // Eg: active, inactive
        feature: String, // Eg: Lightweight, Durable
        gender: String,
        createdBy: { type: Types.ObjectId, ref: 'Admin', required: true },
    },
    { timestamps: true }, // automatically add and update createdAt and updatedAt fields for you every time you create or update a product.
);

export default model('Product', productSchema);
