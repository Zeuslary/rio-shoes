import express from 'express';
import { shippingController } from '../controllers/index.js';

const router = express.Router();

router.get('/', shippingController.getAll);
router.get('/:id', shippingController.getById);
router.post('/', shippingController.create);
router.delete('/:id', shippingController.deleteById);
router.put('/:id', shippingController.updateById);

export default router;
