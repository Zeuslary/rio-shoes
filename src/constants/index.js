export const API_BASE_URL = 'http://localhost:5000/api';
export const FRONT_END_URL = 'http://localhost:5173';

export const UPLOAD_FOLDERS = {
    admin: 'uploads/admins',
    product: 'uploads/products',
    brand: 'uploads/brands',
};

export const IMG_ADMIN_PATH = `${FRONT_END_URL}/${UPLOAD_FOLDERS.admin}/`;
export const IMG_PRODUCT_PATH = `${FRONT_END_URL}/${UPLOAD_FOLDERS.product}/`;
export const IMG_BRAND_PATH = `${FRONT_END_URL}/${UPLOAD_FOLDERS.brand}/`;
