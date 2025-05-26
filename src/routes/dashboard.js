import express from 'express';

import { dashboardController } from '../controllers/index.js';

const router = express.Router();

router.get('/', dashboardController.getDashboardData);

export default router;
