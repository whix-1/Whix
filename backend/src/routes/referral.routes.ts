import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import User from '../models/User';
import Transaction from '../models/Transaction';
import Commission from '../models/Commission';
import Wallet from '../models/Wallet';
import { logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get referral code
router.get('/code', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user?.referralCode) {
      const referralCode = `WHIX${uuidv4().substring(0, 8).toUpperCase()}`;
      user.referralCode = referralCode;
      await user.save();
    }

    res.json({
      success: true,
      referralCode: user.referralCode,
      referralLink: `https://whixvtu.com/register?ref=${user.referralCode}`,
    });
  } catch (error) {
    logger.error('Get referral code error:', error);
    res.status(500).json({ success: false, message: 'Failed to get referral code' });
  }
});

// Get earnings
router.get('/earnings', authenticate, async (req, res) => {
  try {
    const commissions = await Commission.findAll({
      where: { userId: req.userId },
    });

    const totalEarnings = commissions
      .filter((c) => c.status === 'paid')
      .reduce((sum, c) => sum + parseFloat(c.amount.toString()), 0);

    const pendingCommissions = commissions
      .filter((c) => c.status !== 'paid')
      .reduce((sum, c) => sum + parseFloat(c.amount.toString()), 0);

    const referralCount = await User.count({
      where: { referredBy: req.userId },
    });

    res.json({
      success: true,
      data: {
        totalEarnings,
        pendingCommissions,
        referralCount,
        commissions: commissions.map((c) => ({
          id: c.id,
          amount: c.amount,
          type: c.type,
          status: c.status,
          createdAt: c.createdAt,
        })),
      },
    });
  } catch (error) {
    logger.error('Get earnings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch earnings' });
  }
});

// Withdraw commissions
router.post('/withdraw', authenticate, async (req, res) => {
  try {
    const { amount, bankCode, accountNumber, accountName } = req.body;

    const commissions = await Commission.findAll({
      where: { userId: req.userId, status: 'approved' },
    });

    const availableAmount = commissions.reduce(
      (sum, c) => sum + parseFloat(c.amount.toString()),
      0
    );

    if (amount > availableAmount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient commission balance',
      });
    }

    // Deduct from commissions
    let remaining = amount;
    for (const commission of commissions) {
      if (remaining <= 0) break;
      const commissionAmount = parseFloat(commission.amount.toString());
      if (commissionAmount >= remaining) {
        commission.status = 'paid';
        commission.paidAt = new Date();
        remaining = 0;
      } else {
        commission.status = 'paid';
        remaining -= commissionAmount;
      }
      await commission.save();
    }

    // TODO: Initiate bank transfer

    res.json({
      success: true,
      message: 'Withdrawal request processed',
      transactionRef: `WD_${Date.now()}`,
    });
  } catch (error) {
    logger.error('Withdrawal error:', error);
    res.status(500).json({ success: false, message: 'Withdrawal failed' });
  }
});

// Get referral stats
router.get('/stats', authenticate, async (req, res) => {
  try {
    const referrals = await User.findAll({
      where: { referredBy: req.userId },
      attributes: ['id', 'email', 'createdAt', 'status'],
    });

    const referralStats = await Promise.all(
      referrals.map(async (ref) => {
        const transactionCount = await Transaction.count({
          where: { userId: ref.id },
        });
        const totalSpent = await Transaction.sum('totalAmount', {
          where: { userId: ref.id },
        });

        return {
          userId: ref.id,
          email: ref.email,
          joinDate: ref.createdAt,
          status: ref.status,
          transactions: transactionCount,
          totalSpent: totalSpent || 0,
        };
      })
    );

    res.json({
      success: true,
      data: {
        totalReferrals: referrals.length,
        activeReferrals: referrals.filter((r) => r.status === 'active').length,
        referrals: referralStats,
      },
    });
  } catch (error) {
    logger.error('Get referral stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

export default router;
