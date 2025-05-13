import express from 'express';
import { brandController } from '../controllers/index.js';

// Define a router
const router = express.Router();

// Get all brands
router.get('/', brandController.getAll);

export default router;
