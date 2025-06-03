import express from 'express';
import { voucherController } from '../controllers/index.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Public router

// GET /api/vouchers/check?code=FREESHIP
router.get('/check', voucherController.getByCode);

router.get('/:id', voucherController.getById);

// Private router, required token for router below
router.use(verifyToken);

router.get('/', voucherController.getAll);

router.post('/', voucherController.create);

router.delete('/:id', voucherController.deleteById);

router.put('/:id', voucherController.updateById);

export default router;
