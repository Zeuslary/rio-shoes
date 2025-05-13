import express from 'express';
import { customerController } from '../controllers/index.js';

const router = express.Router();

router.get('/', customerController.getAll);

export default router;
