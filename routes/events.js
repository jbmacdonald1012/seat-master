import { Router } from 'express';
import * as eventController from '../controllers/eventController.js';

const router = Router();

router.get('/', eventController.list);
router.get('/:id', eventController.detail);

export default router;
