import { Router } from 'express';
import commentController from '../controllers/commentController.js';
import ratingController from '../controllers/ratingController.js';
import { requireAuth, requireEmployee } from '../middleware/auth.js';
import { validateComment, validateRating } from '../middleware/validation.js';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Comments
router.post('/comments', requireAuth, validateComment, commentController.createComment);
router.delete('/comments/:id', requireAuth, commentController.deleteComment);
router.post('/comments/:id/flag', requireEmployee, commentController.flagComment);

// Ratings
router.post('/ratings', requireAuth, validateRating, ratingController.createOrUpdateRating);
router.delete('/ratings/:eventId', requireAuth, ratingController.deleteRating);

export default router;
