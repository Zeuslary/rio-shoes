import express from 'express';

import uploadStorage from '../multer/uploadStorage.js';

import { customerController } from '../controllers/index.js';

const router = express.Router();

router.get('/', customerController.getAll);

router.get('/:id', customerController.getById);

router.post('/', uploadStorage.customers.single('avatar'), customerController.create);

router.delete('/:id', customerController.deleteById);

router.put('/:id', uploadStorage.customers.single('avatar'), customerController.updateById);

export default router;
