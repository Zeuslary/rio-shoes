import express from 'express';
import { voucherController } from '../controllers/index.js';

const router = express.Router();

router.get('/', voucherController.getAll);

router.get('/:id', voucherController.getById);

router.post('/', voucherController.create);

router.delete('/:id', voucherController.deleteById);

router.put('/:id', voucherController.updateById);

export default router;
