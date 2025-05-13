import express from 'express';
import { paymentController } from '../controllers/index.js';

const router = express.Router();

router.get('/', paymentController.getAll);

export default router;
