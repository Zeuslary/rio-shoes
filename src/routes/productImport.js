import express from 'express';
import { productImportController } from '../controllers/index.js';
import { verifyTokenAdmin } from '../middlewares/verifyToken.js';

const router = express.Router();

router.use(verifyTokenAdmin);

router.get('/', productImportController.getAll);

router.get('/:id', productImportController.getById);

router.post('/', productImportController.create);

router.delete('/:id', productImportController.deleteById);

router.put('/:id', productImportController.updateById);

export default router;
