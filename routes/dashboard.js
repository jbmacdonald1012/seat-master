import { Router } from 'express';
import * as dashboardController from '../controllers/dashboardController.js';
import { requireLogin } from '../middleware/auth.js';

const router = Router();

router.get('/', requireLogin, dashboardController.userDashboard);

export default router;
