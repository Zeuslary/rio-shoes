import express from 'express';
import { shippingController } from '../controllers/index.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Public api
router.get('/:id', shippingController.getById);

// Private api
router.use(verifyToken);
router.get('/', shippingController.getAll);
router.post('/', shippingController.create);
router.delete('/:id', shippingController.deleteById);
router.put('/:id', shippingController.updateById);

export default router;
