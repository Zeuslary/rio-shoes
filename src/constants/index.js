export const API_BASE_URL = 'http://localhost:5000/api';
export const FRONT_END_URL = 'http://localhost:5173';

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
