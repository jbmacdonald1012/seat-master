import { Router } from 'express';
import dashboardController from '../controllers/dashboardController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, dashboardController.userDashboard);

export default router;
