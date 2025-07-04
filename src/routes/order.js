import express from 'express';
import { orderController } from '../controllers/index.js';
import { verifyTokenAdmin } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/tracking', orderController.filterByPhone);

router.get('/history', orderController.getByCustomerId);

router.get('/search', orderController.search);

router.get('/', orderController.getAll);

router.get('/:id', orderController.getById);

router.post('/', orderController.create);

// Private router
router.use(verifyTokenAdmin);
router.delete('/:id', orderController.deleteById);

router.put('/:id', orderController.updateById);

export default router;
