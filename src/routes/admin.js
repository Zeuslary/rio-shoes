import express from 'express';

import uploadStorage from '../multer/uploadStorage.js';
import { adminController } from '../controllers/index.js';

const router = express.Router();

router.get('/', adminController.getAll);
router.get('/:id', adminController.getById);

console.log('Upload: ', uploadStorage);

// Save a file of field 'avatar'into local storage you configure
router.post('/', uploadStorage.admins.single('avatar'), adminController.create);
router.delete('/:id', adminController.deleteById);

// Update and get field avatar to handle
router.put('/:id', uploadStorage.admins.single('avatar'), adminController.updateById);

export default router;
