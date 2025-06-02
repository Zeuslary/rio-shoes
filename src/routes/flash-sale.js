import express from 'express';
import { flashSaleController } from '../controllers/index.js';

const router = express.Router();

router.get('/', flashSaleController.getMinimal);

export default router;
