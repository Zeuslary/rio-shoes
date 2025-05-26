import { Order, Product, Customer } from '../models/index.js';

const getDashboardData = async (req, res) => {
    try {
        console.log('Fetching dashboard data...', req.body);

        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalCustomers = await Customer.countDocuments();

        // Total revenue calculation
        const totalRevenue = await Order.aggregate([
            {
                $match: {
                    status: 'completed', // Assuming you want revenue from completed orders
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$summary.total' }, // Assuming 'totalPrice' is the field for order total
                },
            },
        ]);

        // Top products base on sold quantity
        const topProducts = await Product.find()
            .sort({
                sold: -1,
            })
            .limit(3);

        // Recent orders base on createdAt
        const recentOrders = await Order.aggregate([
            {
                $sort: {
                    createdAt: -1, // Sort by createdAt in descending order
                },
            },
            {
                $limit: 3,
            },
            {
                $addFields: {
                    itemsCount: {
                        $sum: '$items.quantity',
                    },
                },
            },
        ]);

        return res.status(200).json({
            message: 'Dashboard data fetched successfully!',
            data: {
                totalOrders,
                totalProducts,
                totalCustomers,
                totalRevenue: totalRevenue[0]?.total || 0,
                topProducts,
                recentOrders,
            },
        });
    } catch (err) {
        console.error('Fetching dashboard failed...', err);
        res.status(500).json({
            message: 'Fetching dashboard data error!',
            error: err.message,
        });
    }
};

export default {
    getDashboardData,
};
