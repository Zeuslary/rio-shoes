import express from 'express';
import { voucherController } from '../controllers/index.js';

const router = express.Router();

router.get('/', voucherController.getAll);

export default router;
