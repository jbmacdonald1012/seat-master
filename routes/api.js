import { Router } from 'express';

const router = Router();

// API routes — to be implemented in future sessions
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
