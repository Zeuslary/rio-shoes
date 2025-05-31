import express from 'express';
import { orderController } from '../controllers/index.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', orderController.getAll);

router.get('/:id', orderController.getById);

router.post('/', orderController.create);

// Private router
router.use(verifyToken);
router.delete('/:id', orderController.deleteById);

router.put('/:id', orderController.updateById);

export default router;
