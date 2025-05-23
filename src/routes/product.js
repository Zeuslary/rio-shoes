import express from 'express';

import uploadStorage from '../multer/uploadStorage.js';
import { productController } from '../controllers/index.js';

const router = express.Router();

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.post(
    '/',
    uploadStorage.products.fields([
        { name: 'image', maxCount: 1 },
        { name: 'galleryImages', maxCount: 10 },
    ]),
    productController.create,
);

router.delete('/:id', productController.deleteById);

router.put(
    '/:id',
    uploadStorage.products.fields([
        { name: 'image', maxCount: 1 },
        { name: 'galleryImages', maxCount: 10 },
    ]),
    productController.updateById,
);

export default router;
