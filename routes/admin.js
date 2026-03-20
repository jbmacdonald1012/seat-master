import { Router } from 'express';
import adminController from '../controllers/adminController.js';
import { requireAdmin, requireEmployee } from '../middleware/auth.js';
import { validateEvent } from '../middleware/validation.js';

const router = Router();

// Dashboard
router.get('/', requireEmployee, adminController.dashboard);

// Events Management
router.get('/events', requireEmployee, adminController.manageEvents);
router.get('/events/new', requireEmployee, adminController.newEventForm);
router.post('/events', requireEmployee, validateEvent, adminController.createEvent);
router.get('/events/:id/edit', requireEmployee, adminController.editEventForm);
router.post('/events/:id/edit', requireEmployee, validateEvent, adminController.updateEvent);
router.post('/events/:id/delete', requireAdmin, adminController.deleteEvent);

// Categories (Admin only)
router.get('/categories', requireAdmin, adminController.manageCategories);

// Purchases
router.get('/purchases', requireEmployee, adminController.managePurchases);
router.post('/purchases/:id/status', requireEmployee, adminController.updatePurchaseStatus);

// Users (Admin only)
router.get('/users', requireAdmin, adminController.manageUsers);

// Contact Messages
router.get('/contacts', requireEmployee, adminController.manageContacts);

export default router;
