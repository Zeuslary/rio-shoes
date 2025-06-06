import express from 'express';

import uploadStorage from '../multer/uploadStorage.js';

import { customerController } from '../controllers/index.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', customerController.getAll);

router.get('/:id', customerController.getById);

router.post('/unique-username', customerController.uniqueUserName);

router.post('/login', customerController.login);

router.put('/:id/change-password', customerController.updatePassword);

router.post('/', uploadStorage.customers.single('avatar'), customerController.create);

// Private router
router.use(verifyToken);
router.delete('/:id', customerController.deleteById);

router.put(
    '/:id',
    uploadStorage.customers.single('avatar'),
    customerController.updateById,
);

export default router;
