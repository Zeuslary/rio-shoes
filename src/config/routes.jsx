const routes = {
    login: '/login', //Done
    register: '/register', //Done
    home: '/', //Done
    product: '/product', // Merger form page adidas, nike, puma
    adidas: '/adidas', //Done -> Switch into product
    nike: '/nike', //Done -> Switch into product
    puma: '/puma', //Done -> Switch into product
    orderTracking: '/order-tracking', //Done
    contact: '/contact', //Done
    search: '/search', //Done
    cart: '/cart', //Done
    productDetail: '/product', //Done
    checkout: '/checkout', //Done
    confirmOrder: '/confirm-order', //Done
    orderSuccess: '/order-success', //Done
    orderFail: '/order-fail', //Done
    orderHistory: '/order-history', //Done
    orderDetail: '/order-detail', //Done

    userInfo: '/user-info', // After register of customer
    accountProfile: '/account-profile',

    // Admin routes
    adminLogin: '/admin', //

    adminDashboard: '/admin/dashboard', //Done
    adminProducts: '/admin/products', //Done
    adminOrders: '/admin/orders', //Done
    adminCustomers: '/admin/customers', //Done
    adminCategories: '/admin/categories', //Done -> Not used, but kept for future use
    adminPayments: '/admin/payments', //Done
    adminShippings: '/admin/shippings', // Switch promotion -> Shipping methods
    adminReports: '/admin/reports', //Done
    adminAccounts: '/admin/accounts', // Switch admins -> Accounts
    adminSetting: '/admin/settings', //Done
    adminVouchers: '/admin/vouchers', //Done
    adminBrands: '/admin/brands', // Done
    adminImports: '/admin/imports', // Done
};

export default routes;
