import { Router } from 'express';
import eventController from '../controllers/eventController.js';

const router = Router();

router.get('/', eventController.listEvents);
router.get('/category/:slug', eventController.eventsByCategory);
router.get('/:id', eventController.viewEvent);

export default router;
