import { Router } from 'express';
import homeController from '../controllers/homeController.js';

const router = Router();

router.get('/', homeController.index);
router.get('/about', homeController.about);

export default router;
