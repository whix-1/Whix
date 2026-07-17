import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import User from '../models/User';
import { logger } from '../utils/logger';
import QRCode from 'qrcode';
import * as nodemailer from 'nodemailer';

const router = Router();

// Generate QR code for wallet address
router.get('/qr-code', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const qrData = `whixvtu://pay/${user.id}/${user.email}`;
    const qrCode = await QRCode.toDataURL(qrData);

    res.json({
      success: true,
      qrCode,
      walletId: user.id,
    });
  } catch (error) {
    logger.error('QR code generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate QR code',
    });
  }
});

// Scan QR code for payment
router.post('/scan', authenticate, async (req, res) => {
  try {
    const { qrData, amount } = req.body;

    // Parse QR data: whixvtu://pay/{userId}/{email}
    const parts = qrData.split('/');
    const targetUserId = parts[parts.length - 2];

    const targetUser = await User.findByPk(targetUserId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      recipient: {
        id: targetUser.id,
        email: targetUser.email,
        name: `${targetUser.firstName} ${targetUser.lastName}`,
      },
      amount,
    });
  } catch (error) {
    logger.error('QR scan error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to scan QR code',
    });
  }
});

// Send money to another user
router.post('/send', authenticate, async (req, res) => {
  try {
    const { recipientId, amount, description } = req.body;

    const sender = await User.findByPk(req.userId);
    const recipient = await User.findByPk(recipientId);

    if (!sender || !recipient) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (sender.id === recipient.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot send money to yourself',
      });
    }

    // Get wallets
    const senderWallet = await sender.getWallet();
    const recipientWallet = await recipient.getWallet();

    if (!senderWallet || parseFloat(senderWallet.balance.toString()) < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance',
      });
    }

    // Transfer money
    senderWallet.balance = parseFloat(senderWallet.balance.toString()) - amount;
    recipientWallet.balance = parseFloat(recipientWallet.balance.toString()) + amount;

    await senderWallet.save();
    await recipientWallet.save();

    res.json({
      success: true,
      message: 'Money sent successfully',
      reference: `TRF_${Date.now()}`,
      newBalance: senderWallet.balance,
    });
  } catch (error) {
    logger.error('Send money error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send money',
    });
  }
});

// Request money from another user
router.post('/request', authenticate, async (req, res) => {
  try {
    const { fromUserId, amount, reason } = req.body;

    const requester = await User.findByPk(req.userId);
    const targetUser = await User.findByPk(fromUserId);

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // TODO: Store money request in database

    res.json({
      success: true,
      message: 'Money request sent',
      requestId: `REQ_${Date.now()}`,
    });
  } catch (error) {
    logger.error('Request money error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to request money',
    });
  }
});

export default router;
