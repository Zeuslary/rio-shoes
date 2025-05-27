import express from 'express';

import { adminAccountController } from '../controllers/index.js';

const router = express.Router();

// Login
router.post('/', adminAccountController.login);

export default router;
