import express from 'express';

import uploadStorage from '../multer/uploadStorage.js';
import verifyToken from '../middlewares/verifyToken.js';
import { adminController } from '../controllers/index.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', adminController.getAll);
router.get('/:id', adminController.getById);

console.log('Upload: ', uploadStorage);

// Save a file of field 'avatar'into local storage you configure
router.post('/', uploadStorage.admins.single('avatar'), adminController.create);
router.delete('/:id', adminController.deleteById);

// Change info of admin expect password
router.put('/:id', uploadStorage.admins.single('avatar'), adminController.updateById);

// Change password
router.put('/:id/change-password', adminController.updatePassword);

export default router;
