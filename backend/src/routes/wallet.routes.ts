import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/balance', authenticate, (req, res) => {
  res.json({ message: 'Get wallet balance' });
});

router.post('/fund', authenticate, (req, res) => {
  res.json({ message: 'Fund wallet' });
});

router.post('/withdraw', authenticate, (req, res) => {
  res.json({ message: 'Withdraw funds' });
});

router.get('/transactions', authenticate, (req, res) => {
  res.json({ message: 'Get wallet transactions' });
});

export default router;
