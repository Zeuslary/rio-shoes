import { Customer, Order } from '../models/index.js';

const getReport = async (req, res) => {
    try {
        const { range = 'all' } = req.query;
        const limit = 5;

        let fromDate;
        if (range?.includes('d')) {
            const days = parseInt(range.replace('d', ''));

            fromDate = new Date();
            fromDate.setDate(fromDate.getDate() - days);
        }

        console.log('From day:', fromDate);

        const conditionDate = fromDate
            ? {
                  createdAt: {
                      $gte: fromDate,
                  },
              }
            : {};

        // Get order matching
        const orders = await Order.find(conditionDate);

        // Total revenue (just complete order)
        const totalRevenue = orders.reduce((total, order) => {
            if (!order.status.includes('complete')) return total;
            return (total += Number(order?.summary?.total));
        }, 0);

        // Total products sold
        const productSold = orders.reduce((total, order) => {
            const numQuantity = order.items.reduce(
                (res, item) => (res += item.quantity),
                0,
            );

            return (total += numQuantity);
        }, 0);

        // Total orders
        const totalOrders = orders.length;

        // New customers
        const customers = await Customer.find(conditionDate);
        const newCustomers = customers.length;

        // Top 5 selling products
        const topProducts = await Order.aggregate([
            { $match: conditionDate },
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items._id',
                    name: {
                        // Can't use '$items.name' so need use first
                        $first: '$items.name',
                    },
                    sold: {
                        $sum: '$items.quantity',
                    },
                    totalValue: {
                        $sum: {
                            $multiply: ['$items.quantity', '$items.price'],
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            {
                $unwind: '$product',
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    sold: 1,
                    totalValue: 1,
                    image: '$product.image',
                },
            },
            { $sort: { totalValue: -1 } },
            {
                $limit: limit,
            },
        ]);

        // Top 5 selling brand
        const topBrands = await Order.aggregate([
            { $match: conditionDate },
            { $unwind: '$items' },
            // Lookup to get brandId
            {
                $lookup: {
                    from: 'products',
                    localField: 'items._id',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            // Flat product just lookup
            { $unwind: '$product' },
            // Lookup to join brand info to brandId
            {
                $lookup: {
                    from: 'brands',
                    localField: 'product.brandId',
                    foreignField: '_id',
                    as: 'brand',
                },
            },
            { $unwind: '$brand' },
            // Group to result
            {
                $group: {
                    _id: '$brand.name',
                    totalSold: { $sum: '$items.quantity' },
                    totalValue: {
                        $sum: {
                            $multiply: ['$items.quantity', '$items.price'],
                        },
                    },
                },
            },
            { $sort: { totalValue: -1 } },
            {
                $limit: limit,
            },
        ]);

        // Top 5 recent orders
        const recentOrders = await Order.find(conditionDate)
            .sort({
                createdAt: -1,
            })
            .limit(limit)
            .populate('customerId', 'fullName');

        // Top 5 customers orders
        const topCustomers = await Order.aggregate([
            { $match: conditionDate },
            {
                $group: {
                    _id: '$customerId',
                    totalValue: {
                        $sum: '$summary.total',
                    },
                    totalOrders: {
                        $sum: 1,
                    },
                },
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'customer',
                },
            },
            {
                $unwind: '$customer',
            },
            {
                $project: {
                    _id: 1,
                    fullName: '$customer.fullName',
                    totalValue: 1,
                    totalOrders: 1,
                },
            },
            { $sort: { totalValue: -1 } },
            { $limit: limit },
        ]);

        // Status orders
        const statusOrder = await Order.aggregate([
            { $match: conditionDate },
            {
                $group: {
                    _id: '$status',
                    total: { $sum: 1 },
                },
            },
        ]);

        console.log('Orders: ', orders);
        console.log('Top products: ', topProducts);
        console.log('Top brands: ', topBrands);
        console.log('Recent orders: ', recentOrders);
        console.log('Top customers: ', topCustomers);
        console.log('Status order: ', statusOrder);

        console.log('Total revenue: ', totalRevenue);
        console.log('Total orders: ', totalOrders);
        console.log('New customer: ', newCustomers);
        console.log('Product sold: ', productSold);

        return res.status(200).json({
            message: 'Get report successfully!',
            topProducts,
            topBrands,
            recentOrders,
            topCustomers,
            statusOrder,
            totalRevenue,
            totalOrders,
            newCustomers,
            productSold,
        });
    } catch (err) {
        console.error('Get report failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

export default {
    getReport,
};
