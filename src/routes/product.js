import express from 'express';

import uploadStorage from '../multer/uploadStorage.js';
import { verifyTokenAdmin } from '../middlewares/verifyToken.js';
import { productController } from '../controllers/index.js';

const router = express.Router();

// Use for client
router.get('/search', productController.getBaseOnName);

router.get('/new', productController.getNewProducts);

router.get('/part', productController.getPart);

router.get('/filter-admin', productController.productFilterAdmin);

router.get('/filter', productController.productFilter);

router.get('/detail/:id', productController.getDetail);

router.get('/minimal', productController.getAllMinimal);

router.get('/:id', productController.getById);

router.get('/:id/suggestion', productController.getSuggestion);

router.get('/', productController.getAll);

// Private api
router.use(verifyTokenAdmin);
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
