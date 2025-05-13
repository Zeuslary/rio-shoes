import express from 'express';
import { adminController } from '../controllers/index.js';

const router = express.Router();

router.get('/', adminController.getAll);

export default router;
