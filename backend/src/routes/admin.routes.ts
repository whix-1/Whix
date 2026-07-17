import { Router } from 'express';

const router = Router();

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard' });
});

router.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

router.get('/transactions', (req, res) => {
  res.json({ message: 'Get all transactions' });
});

router.get('/reports', (req, res) => {
  res.json({ message: 'Get reports' });
});

export default router;
