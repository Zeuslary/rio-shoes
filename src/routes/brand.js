import express from 'express';

import uploadStorage from '../multer/uploadStorage.js';
import verifyToken from '../middlewares/verifyToken.js';

import { brandController } from '../controllers/index.js';

// Define a router
const router = express.Router();

// Public api
router.get('/', brandController.getAll);

router.get('/minimal', brandController.getAllMinimal);

router.get('/:id', brandController.getById);

// Private api
router.use(verifyToken);
router.post('/', uploadStorage.brands.single('logo'), brandController.create);

router.delete('/:id', brandController.deleteById);

router.put('/:id', uploadStorage.brands.single('logo'), brandController.updateById);

export default router;
