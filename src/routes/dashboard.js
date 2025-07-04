import express from 'express';

import { verifyTokenAdmin } from '../middlewares/verifyToken.js';
import { dashboardController } from '../controllers/index.js';

const router = express.Router();

// Verify if the user is authenticated in all route
router.use(verifyTokenAdmin);

// Use can add verifyTokenAdmin to specific route if you want something like:
//  router.get('/', verifyTokenAdmin, dashboardController.getDashboardData)
router.get('/', dashboardController.getDashboardData);

export default router;
