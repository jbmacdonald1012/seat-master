import { Router } from 'express';
import * as contactController from '../controllers/contactController.js';

const router = Router();

router.get('/', contactController.showForm);
router.post('/', contactController.submit);
router.get('/success', contactController.success);

export default router;
