import { Product } from '../models/index.js';

const getMinimal = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $lt: ['$newPrice', '$originalPrice'],
                    },
                    status: 'active',
                    stock: { $gt: 0 },
                },
            },
            {
                $addFields: {
                    discountPercent: {
                        $multiply: [
                            {
                                $divide: [
                                    {
                                        $subtract: ['$originalPrice', '$newPrice'],
                                    },
                                    '$originalPrice',
                                ],
                            },
                            100,
                        ],
                    },
                },
            },
            {
                $sort: { discountPercent: -1 },
            },
            {
                $limit: 10,
            },
        ]);

        console.log('Products: ', products);

        return res.status(200).json({
            message: 'Fetching data for flash sale successfully!',
            data: products,
        });
    } catch (err) {
        console.error('Fetching data for flash sale failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

export default {
    getMinimal,
};
