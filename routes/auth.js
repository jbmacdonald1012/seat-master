import { Router } from 'express';
import authController from '../controllers/authController.js';
import { redirectIfAuth } from '../middleware/auth.js';
import { validateRegistration } from '../middleware/validation.js';

const router = Router();

router.get('/register', redirectIfAuth, authController.showRegister);
router.post('/register', redirectIfAuth, validateRegistration, authController.register);

router.get('/login', redirectIfAuth, authController.showLogin);
router.post('/login', redirectIfAuth, authController.login);

router.post('/logout', authController.logout);

export default router;
