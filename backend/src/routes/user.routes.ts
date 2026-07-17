import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Get user profile' });
});

router.put('/profile', authenticate, (req, res) => {
  res.json({ message: 'Update user profile' });
});

router.post('/kyc', authenticate, (req, res) => {
  res.json({ message: 'Submit KYC' });
});

router.get('/referral', authenticate, (req, res) => {
  res.json({ message: 'Get referral data' });
});

export default router;
