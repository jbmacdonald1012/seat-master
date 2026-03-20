import { Router } from 'express';
import purchaseController from '../controllers/purchaseController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/checkout/:eventId', requireAuth, purchaseController.showCheckout);
router.post('/complete', requireAuth, purchaseController.completePurchase);
router.get('/:id', requireAuth, purchaseController.viewPurchase);

export default router;
