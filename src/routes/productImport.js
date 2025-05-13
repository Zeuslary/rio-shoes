import express from 'express';
import { productImportController } from '../controllers/index.js';

const router = express.Router();

router.get('/', productImportController.getAll);

export default router;
