// export const API_BASE_URL = 'http://localhost:5000/api';
// export const FRONT_END_URL = 'http://localhost:5173';
export const API_BASE_URL = import.meta.env.API_BASE_URL;
export const FRONT_END_URL = import.meta.env.FRONTEND_URL;

// Key of localStorage
export const keyLocalStorageCart = 'LIST_PRODUCT_CART';
export const keyCustomerProfile = 'PROFILE_CUSTOMER';
export const keyAdminProfile = 'PROFILE_ADMIN';
export const keyShippingMethods = 'SHIPPING_METHODS';
export const keyPaymentMethods = 'PAYMENT_METHODS';

export const keyUserToken = 'customerToken';
export const keyAdminToken = 'adminToken';
export const keyToken = 'token';

// Folder to save img
export const UPLOAD_FOLDERS = {
    admin: 'uploads/admins',
    product: 'uploads/products',
    brand: 'uploads/brands',
    customer: 'uploads/customers',
};

export const IMG_ADMIN_PATH = `${FRONT_END_URL}/${UPLOAD_FOLDERS.admin}/`;
export const IMG_PRODUCT_PATH = `${FRONT_END_URL}/${UPLOAD_FOLDERS.product}/`;
export const IMG_BRAND_PATH = `${FRONT_END_URL}/${UPLOAD_FOLDERS.brand}/`;
export const IMG_CUSTOMER_PATH = `${FRONT_END_URL}/${UPLOAD_FOLDERS.customer}/`;

export const STATUSES = ['active', 'inactive', 'banned'];
export const ROLES = ['admin', 'super admin'];
export const STATUSES_VOUCHER = ['active', 'scheduled', 'expired'];
export const DISCOUNT_TYPES = ['fixed', 'percent'];
export const ARRANGE_TYPES = ['descending', 'ascending'];

export const ORDER_STATUSES = [
    'pending',
    'shipping',
    'delivered',
    'completed',
    'cancelled',
];

export const SORT_OPTIONS = [
    { label: 'Mới nhất', value: 'newest' },
    { label: 'Bán chạy', value: 'bestSeller' },
    { label: 'Giá giảm dần', value: 'priceDesc' },
    { label: 'Giá tăng dần', value: 'priceAsc' },
    { label: 'A - Z', value: 'az' },
    { label: 'Z - A', value: 'za' },
];

export const FILTER_PRODUCTS = ['All Products', 'Adidas', 'Nike', 'Puma'];

export { default as productOption } from './productOption.js';
