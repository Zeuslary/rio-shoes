import express from 'express';

import uploadStorage from '../multer/uploadStorage.js';

import { customerController } from '../controllers/index.js';
import { verifyTokenAdmin, verifyTokenCustomer } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', customerController.getAll);

router.get('/:id', customerController.getById);

router.post('/unique-username', customerController.uniqueUserName);

router.post('/login', customerController.login);

router.put('/:id/change-password', customerController.updatePassword);

router.post('/', uploadStorage.customers.single('avatar'), customerController.create);

// Private router
// router.use(verifyToken);
router.delete('/:id', verifyTokenAdmin, customerController.deleteById);

router.put(
    '/:id',
    verifyTokenCustomer,
    uploadStorage.customers.single('avatar'),
    customerController.updateById,
);

export default router;
