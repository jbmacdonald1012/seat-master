import { Router } from 'express';
import * as adminController from '../controllers/adminController.js';
import { requireAdmin, requireEmployee } from '../middleware/auth.js';

const router = Router();

router.get('/', requireEmployee, adminController.dashboard);
router.get('/events', requireEmployee, adminController.events);
router.get('/events/new', requireEmployee, adminController.eventForm);
router.get('/events/:id/edit', requireEmployee, adminController.eventForm);
router.get('/categories', requireAdmin, adminController.categories);
router.get('/purchases', requireEmployee, adminController.purchases);
router.get('/users', requireAdmin, adminController.users);
router.get('/contacts', requireEmployee, adminController.contacts);

export default router;
