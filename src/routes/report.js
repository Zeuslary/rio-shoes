import express from 'express';
import { verifyTokenAdmin } from '../middlewares/verifyToken.js';
import { reportController } from '../controllers/index.js';

const router = express.Router();

router.use(verifyTokenAdmin);

// GET /api/admin/report?range=7d or 30d or all
router.get('/', reportController.getReport);

export default router;
