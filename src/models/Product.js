import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

// [String]: a array contain value is string
// ref is used to create relationships between collection (look like foreign key in SQL)
// enum: to validator value
// timestamps option: set it true, Mongoose will add 2 prop
//  createdAt, and updatedAt auto

// type: ['sport', 'lifestyle', 'casual', 'formal', 'training', 'hiking', 'running', 'walking']
// category: ['shoes', 'sneakers', 'sandals', 'boots', 'slippers', 'accessories']
// style: ['low-top', 'mid-top', 'high-top', 'chunky', 'sleek', 'minimalist', 'retro', 'modern']
// design: ['classic', 'sporty', 'elegant', 'casual', 'streetwear', 'vintage', 'futuristic', 'artistic']
// material: ['leather', 'canvas', 'mesh', 'synthetic', 'rubber', 'textile', 'suede', 'nylon']
// origin: ['Vietnam', 'China', 'USA', 'Germany', 'Italy', 'Indonesia', 'India', 'Thailand']
// tag: ['hot', 'new', 'sale', 'best-seller', 'limited-edition', 'exclusive']
// colors: ['black', 'white', 'red', 'blue', 'green', 'yellow', 'gray', 'brown', 'pink', 'orange', 'beige', 'purple']
// sizes: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45']
// gender:  ['male', 'female', 'unisex', 'kids']

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: String,
        brandId: { type: Types.ObjectId, ref: 'Brand', required: true },
        category: [String],
        type: [String],
        style: [String],
        material: [String],
        design: [String],
        releaseYear: Number,
        origin: String,
        colors: [String],
        sizes: [String],
        stock: Number,
        sold: Number,
        originalPrice: Number,
        newPrice: Number,
        image: String,
        galleryImages: [String],
        tag: [String],
        fakeHot: Boolean, // Desc: Sometime you want to fake that this product is hot
        status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
        feature: String, // Eg: Lightweight, Durable
        gender: String,
        createdBy: { type: Types.ObjectId, ref: 'Admin' },
    },
    { timestamps: true }, // automatically add and update createdAt and updatedAt fields for you every time you create or update a product.
);

export default model('Product', productSchema);
