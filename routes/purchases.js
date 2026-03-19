import { Router } from 'express';
import * as purchaseController from '../controllers/purchaseController.js';
import { requireLogin } from '../middleware/auth.js';

const router = Router();

router.get('/checkout/:ticketId', requireLogin, purchaseController.showCheckout);
router.post('/checkout/:ticketId', requireLogin, purchaseController.checkout);
router.get('/:id', requireLogin, purchaseController.detail);

export default router;
