import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth';
import Wallet from '../models/Wallet';
import Transaction from '../models/Transaction';
import { logger } from '../utils/logger';
import axios from 'axios';

const router = Router();

// Initialize Paystack Payment
router.post('/paystack/initialize', authenticate, async (req, res) => {
  try {
    const { amount, email } = req.body;

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        amount: amount * 100,
        email,
        metadata: {
          userId: req.userId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    res.json({
      success: true,
      data: response.data.data,
    });
  } catch (error) {
    logger.error('Paystack initialization failed:', error);
    res.status(400).json({
      success: false,
      message: 'Payment initialization failed',
    });
  }
});

// Verify Paystack Payment
router.post('/paystack/verify', authenticate, async (req, res) => {
  try {
    const { reference } = req.body;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === 'success') {
      const wallet = await Wallet.findOne({
        where: { userId: req.userId },
      });

      if (wallet) {
        wallet.balance = parseFloat(wallet.balance.toString()) + response.data.data.amount / 100;
        await wallet.save();

        // Create transaction record
        await Transaction.create({
          userId: req.userId,
          type: 'topup',
          service: 'Wallet Funding',
          amount: response.data.data.amount / 100,
          fee: 0,
          discount: 0,
          totalAmount: response.data.data.amount / 100,
          provider: 'Paystack',
          status: 'success',
          reference,
          metadata: response.data.data,
        });
      }

      res.json({
        success: true,
        message: 'Payment verified successfully',
        balance: wallet?.balance,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    logger.error('Payment verification failed:', error);
    res.status(400).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
});

// Initialize Flutterwave Payment
router.post('/flutterwave/initialize', authenticate, async (req, res) => {
  try {
    const { amount, email } = req.body;

    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      {
        tx_ref: `whix_${Date.now()}`,
        amount,
        currency: 'NGN',
        customer: {
          email,
        },
        customizations: {
          title: 'Whix VTU',
          logo: 'https://whixvtu.com/logo.png',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    res.json({
      success: true,
      data: response.data.data,
    });
  } catch (error) {
    logger.error('Flutterwave initialization failed:', error);
    res.status(400).json({
      success: false,
      message: 'Payment initialization failed',
    });
  }
});

export default router;
