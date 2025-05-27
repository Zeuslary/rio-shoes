import express from 'express';

import verifyToken from '../middlewares/verifyToken.js';
import { dashboardController } from '../controllers/index.js';

const router = express.Router();

// Verify if the user is authenticated in all route
router.use(verifyToken);

// Use can add verifyToken to specific route if you want something like:
//  router.get('/', verifyToken, dashboardController.getDashboardData)
router.get('/', dashboardController.getDashboardData);

export default router;
