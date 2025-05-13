import express from 'express';
import { orderController } from '../controllers/index.js';

const router = express.Router();

router.get('/', orderController.getAll);

export default router;
