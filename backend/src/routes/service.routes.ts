import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/airtime', authenticate, (req, res) => {
  res.json({ message: 'Get airtime services' });
});

router.post('/airtime/buy', authenticate, (req, res) => {
  res.json({ message: 'Buy airtime' });
});

router.get('/data', authenticate, (req, res) => {
  res.json({ message: 'Get data services' });
});

router.post('/data/buy', authenticate, (req, res) => {
  res.json({ message: 'Buy data' });
});

router.get('/electricity', authenticate, (req, res) => {
  res.json({ message: 'Get electricity services' });
});

router.post('/electricity/pay', authenticate, (req, res) => {
  res.json({ message: 'Pay electricity bill' });
});

export default router;
