import { Router } from 'express';
import contactController from '../controllers/contactController.js';

const router = Router();

router.get('/', contactController.showContactForm);
router.post('/', contactController.submitContact);
router.get('/success', contactController.success);

export default router;
