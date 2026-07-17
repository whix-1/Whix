import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('phone').isMobilePhone('any'),
    body('password').isLength({ min: 8 }),
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
  ],
  authController.login
);

router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-2fa', authController.verify2FA);
router.post('/enable-2fa', authController.enable2FA);

export default router;
