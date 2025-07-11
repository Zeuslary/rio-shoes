import _ from 'lodash';
import mongoose from 'mongoose';

import { UPLOAD_FOLDERS } from '../constants/index.js';
import deleteFileDiskStorage from '../utils/deleteFileDiskStorage.js';
import Product from '../models/Product.js';
import Brand from '../models/Brand.js';

// Pagination
// pagination: {
//     currentPage: page,
//     lastPage,
//     totalDocuments,
// },

// Make page for this
const getAll = async (req, res) => {
    try {
        const { page = 1 } = req.params;
        const limit = 8;
        const skip = (limit - 1) * page;

        const totalDocuments = await Product.countDocuments();

        const lastPage = Math.ceil(totalDocuments / limit);

        console.log('totalDocuments: ', totalDocuments);
        console.log('limit: ', limit);
        console.log('skip: ', skip);
        console.log('lastPage: ', lastPage);

        const products = await Product.find()
            .populate('brandId', 'name')
            .limit(limit)
            .skip(skip);

        return res.status(200).json({
            data: products,
            pagination: {
                currentPage: page,
                lastPage,
                totalDocuments,
            },
        });
    } catch (err) {
        console.error(`Error fetching products: ${err}`);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const getAllMinimal = async (req, res) => {
    try {
        const products = await Product.find().select('name image originalPrice newPrice');

        console.log('Product ', products);
        return res.status(200).json(products);
    } catch (err) {
        console.error('Fetching data failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

// Get products base on products name
// GET /api/products/search?name=nike
const getBaseOnName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                message: 'Missing search name!',
            });
        }

        const products = await Product.find({
            status: 'active',
            stock: { $gt: 0 },
            // Options 'i' make the search case insensitive
            name: { $regex: name, $options: 'i' },
        });

        console.log('Products: ', products);

        if (products.length === 0)
            return res.status(204).json({
                message: 'Product not found!',
            });

        return res.status(200).json({
            message: 'Get products base on product name successfully!',
            data: products,
        });
    } catch (err) {
        console.error('Get products base on product name failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

// Get a part of products (page 1 ....)
const getPart = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const limit = 16;
        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments({
            status: 'active',
            stock: { $gt: 0 },
        });

        const lastPage = Math.ceil(totalProducts / limit);

        console.log('Count: ', totalProducts);
        console.log('Page: ', page);
        console.log('Last page: ', lastPage);

        const products = await Product.find({
            status: 'active',
            stock: { $gt: 0 },
        })
            .skip(skip)
            .limit(limit)
            .populate('brandId', 'name');

        console.log('Products: ', products);

        return res.status(200).json({
            message: 'Fetching a part of products successfully!',
            data: products,
            currentPage: page,
            lastPage,
        });
    } catch (err) {
        console.error('Fetching a part of products failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

// Suggestion product base on ID
const getSuggestion = async (req, res) => {
    try {
        const id = req.params.id;

        const currentProduct = await Product.findById(id).select('category');

        if (!currentProduct)
            return res.status(404).json({
                message: 'Product not found!',
                data: id,
            });

        const suggestions = await Product.find({
            _id: { $ne: id }, // exclude current product
            status: 'active',
            stock: { $gt: 0 },
            category: { $in: currentProduct.category },
        })
            .limit(8)
            .select('name image originalPrice newPrice type category');

        console.log('Suggestions: ', suggestions);

        return res.status(200).json({
            message: 'Get suggestion products successfully!',
            data: suggestions,
        });
    } catch (err) {
        console.error('Get suggestion products failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

// Include product, relative (category), you also may like (stock decrement)
const getDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const currentProduct = await Product.findById(id);

        if (!currentProduct)
            return res.status(404).json({
                message: 'Product not found!',
                data: id,
            });

        const suggestions = await Product.find({
            _id: { $ne: id }, // exclude current product
            status: 'active',
            stock: { $gt: 0 },
            category: { $in: currentProduct.category },
        })
            .limit(8)
            .select('name image originalPrice newPrice');

        console.log('Suggestions: ', suggestions);

        const youAlsoMayLike = await Product.find({
            _id: { $ne: id }, // exclude current product
            status: 'active',
            stock: { $gt: 0 },
        })
            .sort({ sold: -1 })
            .limit(8)
            .select('name image originalPrice newPrice');

        console.log('youAlsoMayLike: ', youAlsoMayLike);

        return res.status(200).json({
            message: 'Fetching product detail successfully!',
            data: currentProduct,
            suggestions,
            youAlsoMayLike,
        });
    } catch (err) {
        console.error('Get detail product failed...', err);

        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const productFilter = async (req, res) => {
    try {
        const {
            name,
            gender,
            color,
            category,
            type,
            style,
            material,
            design,
            size,
            brandId,
            brandName,
            page = 1,
        } = req.query;

        const filter = {
            status: 'active',
            stock: { $gt: 0 },
        };

        console.log('Query: ', req.query);

        // Filter field is string with option (case-insensitive)
        if (brandId) filter.brandId = brandId;
        if (name) filter.name = { $regex: name, $options: 'i' };

        // Handle for price range
        const { minPrice, maxPrice } = req.query;

        const priceFilter = {};

        if (minPrice) priceFilter.$gt = parseInt(minPrice) || 0;
        if (maxPrice) priceFilter.$lt = parseInt(maxPrice);

        if (minPrice || maxPrice) {
            filter.newPrice = priceFilter;
        }

        // Create aggregation pipeline
        const pipeline = [
            {
                // Match with filter first
                $match: filter,
            },
            // Lookup will return a array
            // -> Need use $unwind to flat
            {
                // If exist brandName -> filter base on this
                $lookup: {
                    from: 'brands', // join with brands collections
                    localField: 'brandId', //  the field in Product that holds the reference (brandId)
                    foreignField: '_id', // the field in the brands collection you're matching with
                    as: 'brand', // new field after match
                },
            },
            {
                $unwind: '$brand',
            },
        ];

        const makeFilter = ({ field, fieldName, regexOptions = 'i', pipeline = [] }) => {
            if (!field) return;

            if (Array.isArray(field) && field.length > 1) {
                pipeline.push({
                    $match: {
                        $or: field.map((item) => ({
                            [fieldName]: {
                                $regex: item,
                                $options: regexOptions,
                            },
                        })),
                    },
                });
            } else {
                pipeline.push({
                    $match: {
                        [fieldName]: {
                            $regex: field,
                            $options: regexOptions,
                        },
                    },
                });
            }

            // To debug the pipeline
            // console.log('Pipeline after make filter: ', pipeline);
        };

        // Filter for fields that can be a string or an array
        makeFilter({
            field: brandName,
            fieldName: 'brand.name',
            pipeline,
        });
        makeFilter({
            field: gender,
            fieldName: 'gender',
            pipeline,
        });
        makeFilter({
            field: color,
            fieldName: 'colors',
            pipeline,
        });
        makeFilter({
            field: category,
            fieldName: 'category',
            pipeline,
        });
        makeFilter({
            field: type,
            fieldName: 'type',
            pipeline,
        });
        makeFilter({
            field: style,
            fieldName: 'style',
            pipeline,
        });
        makeFilter({
            field: material,
            fieldName: 'material',
            pipeline,
        });
        makeFilter({
            field: design,
            fieldName: 'design',
            pipeline,
        });
        makeFilter({
            field: size,
            fieldName: 'sizes',
            pipeline,
        });

        // Pagination
        const limit = 16;
        const skip = (page - 1) * limit;

        const countDocuments = await Product.aggregate([
            ...pipeline,
            {
                $count: 'total',
            },
        ]);

        const totalDocuments = countDocuments[0]?.total || 0;
        const lastPage = Math.ceil(totalDocuments / limit);

        pipeline.push(
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        );

        const products = await Product.aggregate(pipeline);
        console.log('Filter products: ', products);

        return res.status(200).json({
            message: 'Filter products successfully!',
            pagination: {
                currentPage: Number(page) || 1,
                lastPage,
                totalDocuments,
            },
            data: products,
        });
    } catch (err) {
        console.error('Filter products failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const productFilterAdmin = async (req, res) => {
    try {
        const { page = 1, brandName, name } = req.query;
        const limit = 8;
        const skip = (page - 1) * limit;

        const pipeline = [
            {
                $lookup: {
                    from: 'brands',
                    localField: 'brandId',
                    foreignField: '_id',
                    as: 'brandId',
                },
            },
            {
                $unwind: '$brandId',
            },
        ];

        if (brandName)
            pipeline.push({
                $match: {
                    'brandId.name': { $regex: brandName, $options: 'i' },
                },
            });

        if (name)
            pipeline.push({
                $match: {
                    name: { $regex: name, $options: 'i' },
                },
            });

        // Make pagination

        const countPipeline = await Product.aggregate([...pipeline, { $count: 'total' }]);

        const totalDocuments = countPipeline?.[0]?.total || 0;

        const lastPage = Math.ceil(totalDocuments / limit);

        pipeline.push(
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        );

        console.log('Pipeline: ', pipeline);

        const products = await Product.aggregate(pipeline);

        console.log('Product: ', products);

        return res.status(200).json({
            data: products,
            pagination: {
                currentPage: Number(page) || 1,
                lastPage,
                totalDocuments,
            },
        });
    } catch (err) {
        console.error('Filter product for admin failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const getNewProducts = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const limit = 8;
        const skip = (page - 1) * limit;

        // List products
        const products = await Product.find({
            status: 'active',
            stock: { $gt: 0 },
        })
            .sort({
                createdAt: -1, //desc
            })
            .skip(skip) //Skip number of document
            .limit(limit)
            .populate('brandId', 'name');

        console.log('New Products: ', products);

        // Total product
        const totalProducts = await Product.countDocuments({
            status: 'active',
            stock: { $gt: 0 },
        });

        // Calculator how many page
        const lastPage = Math.ceil(totalProducts / limit); // ceil: rounded up

        return res.status(200).json({
            message: 'Fetching new products successfully!',
            data: products,
            currentPage: page,
            lastPage,
        });
    } catch (err) {
        console.error('Fetching new products failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product ID',
                data: id,
            });
        }

        const product = await Product.findById(id);

        if (product)
            return res.status(200).json({
                message: 'Find product successfully!',
                data: product,
            });

        return res.status(404).json({
            message: 'Product not found',
            data: id,
        });
    } catch (err) {
        console.error('Get product failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

// Function delete all files just upload
const deleteFileJustUpload = (files) => {
    // If exist files -> start delete files
    if (files) {
        const { image, galleryImages } = files;

        // Delete img first
        if (files.image) {
            deleteFileDiskStorage(image[0].filename, UPLOAD_FOLDERS.product);
        }

        // Delete gallery imgs
        if (files.galleryImages && galleryImages.length > 0) {
            galleryImages.forEach((img) => {
                deleteFileDiskStorage(img.filename, UPLOAD_FOLDERS.product);
            });
        }
    }
};

// Function delete imgs inside disk storage
const deleteImgsStorage = (image, galleryImages = []) => {
    if (image) {
        deleteFileDiskStorage(image, UPLOAD_FOLDERS.product);
    }

    if (galleryImages && galleryImages.length > 0) {
        galleryImages.forEach((img) => {
            deleteFileDiskStorage(img, UPLOAD_FOLDERS.product);
        });
    }
};

const create = async (req, res) => {
    try {
        const files = req.files;

        console.log('Files: ', files);
        console.log('File image: ', files.image);
        console.log('File galleryImages: ', files.galleryImages);

        if (!req.body) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Empty body',
            });
        }

        if (!req.body.name || !req.body.brandId) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Name, brandId are required',
                data: req.body,
            });
        }

        // Add image and galleryImages to req.body
        if (files) {
            if (files.image && files.image.length > 0) {
                req.body.image = files.image[0].filename;
            }

            if (files.galleryImages && files.galleryImages.length > 0) {
                req.body.galleryImages = files.galleryImages.map((img) => img.filename);
            }
        }

        console.log('Body: ', req.body);

        const newProduct = await new Product(req.body).save();

        // Get brandName
        await newProduct.populate('brandId', 'name');

        console.log('New product: ', newProduct);

        if (!newProduct) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Create product error',
                data: req.body,
            });
        }

        return res.status(200).json({
            message: 'Create product successfully!',
            data: newProduct,
        });
    } catch (err) {
        console.error('Create product failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product ID',
                data: id,
            });
        }

        const product = await Product.findByIdAndDelete(id);

        if (product) {
            // Delete image and galleryImages from disk
            deleteImgsStorage(product.image, product.galleryImages);

            return res.status(200).json({
                message: 'Delete product successfully!',
                data: product,
            });
        }

        return res.status(404).json({
            message: 'Product not found',
            data: id,
        });
    } catch (err) {
        console.error('Delete product failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const files = req.files;
        console.log('Files: ', files);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Invalid product ID',
                data: id,
            });
        }

        if (!req.body && !files) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Empty body',
            });
        }

        const originalProduct = await Product.findById(id);

        if (!originalProduct) {
            deleteFileJustUpload(files);

            return res.status(404).json({
                message: 'Product not found',
                data: id,
            });
        }

        const isChange = !_.isEqual(
            _.pick(originalProduct, Object.keys(req.body)),
            req.body,
        );

        if (!isChange && !files) {
            deleteFileJustUpload(files);

            return res.status(400).json({
                message: 'Product not modified',
                data: req.body,
            });
        }

        // Add image and galleryImages to req.body
        if (files) {
            if (files.image && files.image.length > 0) {
                req.body.image = files.image[0].filename;
            }

            if (files.galleryImages && files.galleryImages.length > 0) {
                req.body.galleryImages = files.galleryImages.map((img) => img.filename);
            }
        }

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (updatedProduct) {
            // If upload both image && galleryImage => delete old img corresponding
            if (files && files.image && files.galleryImages) {
                console.log('Delete image and galleryImages');

                deleteImgsStorage(originalProduct.image, originalProduct.galleryImages);
            }

            // If just img change  -> delete old img inside image
            else if (files && files.image) {
                console.log('Delete image');

                deleteImgsStorage(originalProduct.image);
            }

            // If just galleryImages change  -> delete old img inside galleryImages
            else if (files && files.galleryImages) {
                console.log('Delete galleryImages');

                deleteImgsStorage('', originalProduct.galleryImages);
            }

            return res.status(200).json({
                message: 'Update product successfully!',
                data: updatedProduct,
            });
        }

        // When update error, need delete file upload
        deleteFileJustUpload(files);

        return res.status(400).json({
            message: 'Update product error',
            data: req.body,
        });
    } catch (err) {
        console.error('Update product failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

export default {
    getAll,
    getAllMinimal,
    getBaseOnName,
    getNewProducts,
    getSuggestion,
    getDetail,
    productFilter,
    productFilterAdmin,
    getById,
    getPart,
    create,
    deleteById,
    updateById,
};
