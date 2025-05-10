import images from '~/assets/images';

const fakeReport = {
    totalRevenue: 12345.67,
    totalOrders: 124,
    totalCustomers: 58,
    totalProducts: 36,

    revenueByMonth: [
        { month: '2025-01', revenue: 1450.0 },
        { month: '2025-02', revenue: 1720.5 },
        { month: '2025-03', revenue: 1580.0 },
        { month: '2025-04', revenue: 1965.75 },
        { month: '2025-05', revenue: 3629.42 },
    ],

    ordersByStatus: [
        { status: 'pending', quantity: 12 },
        { status: 'processing', quantity: 20 },
        { status: 'delivered', quantity: 85 },
        { status: 'completed', quantity: 27 },
    ],

    recentOrders: [
        {
            id: 'ORD-1001',
            customerName: 'Alice Johnson',
            status: 'Delivered',
            total: 299.99,
            createdAt: '2025-05-09T10:32:00',
        },
        {
            id: 'ORD-1002',
            customerName: 'David Lee',
            status: 'Pending',
            total: 129.49,
            createdAt: '2025-05-09T08:21:00',
        },
        {
            id: 'ORD-1003',
            customerName: 'Rachel Kim',
            status: 'Cancelled',
            total: 79.9,
            createdAt: '2025-05-08T17:55:00',
        },
        {
            id: 'ORD-1004',
            customerName: 'Michael Chen',
            status: 'Shipped',
            total: 199.0,
            createdAt: '2025-05-08T14:10:00',
        },
    ],
    topProducts: [
        {
            id: 'nike-air-max-270',
            image: images.nikeProduct,
            name: 'Nike Air Max 270',
            sold: 24,
            revenue: 2879.76,
        },
        {
            id: 'adidas-ultraboost',
            image: images.nikeProduct,
            name: 'Adidas Ultraboost',
            sold: 18,
            revenue: 1899.5,
        },
        {
            id: 'converse-chuck-70',
            image: images.nikeProduct,
            name: 'Converse Chuck 70',
            sold: 15,
            revenue: 1120.25,
        },
        {
            id: 'vans-old-skool',
            image: images.nikeProduct,
            name: 'Vans Old Skool',
            sold: 12,
            revenue: 950.0,
        },
    ],
    orderCategories: [
        {
            id: 'lifestyle',
            name: 'Lifestyle',
            sold: 68,
            revenue: 7899.2,
        },
        {
            id: 'running',
            name: 'Running',
            sold: 45,
            revenue: 5230.0,
        },
        {
            id: 'basketball',
            name: 'Basketball',
            sold: 30,
            revenue: 4100.5,
        },
        {
            id: 'skateboarding',
            name: 'Skateboarding',
            sold: 22,
            revenue: 2350.9,
        },
    ],
    newCustomersByMonth: [
        { month: '2025-03', quantity: 12 },
        { month: '2025-04', quantity: 15 },
        { month: '2025-05', quantity: 31 },
    ],
};

export default fakeReport;
