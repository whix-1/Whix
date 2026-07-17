import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, (req, res) => {
  res.json({ message: 'Get all transactions' });
});

router.get('/:id', authenticate, (req, res) => {
  res.json({ message: 'Get transaction details' });
});

router.get('/:id/receipt', authenticate, (req, res) => {
  res.json({ message: 'Download receipt' });
});

export default router;
