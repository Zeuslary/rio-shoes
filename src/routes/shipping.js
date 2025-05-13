import express from 'express';
import { shippingController } from '../controllers/index.js';

const router = express.Router();

router.get('/', shippingController.getAll);

export default router;
