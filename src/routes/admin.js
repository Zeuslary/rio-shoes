import multer from 'multer';
import express from 'express';
import { adminController } from '../controllers/index.js';

const router = express.Router();

// Configure local storage img
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars');
    },
    filename: (req, file, cb) => {
        cb(null, new Date.toISOString() + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get('/', adminController.getAll);
router.get('/:id', adminController.getById);

router.post('/', upload.single(), adminController.create);
router.delete('/:id', adminController.deleteById);
router.put('/:id', adminController.updateById);

export default router;
