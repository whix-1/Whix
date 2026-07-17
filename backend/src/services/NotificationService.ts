import admin from 'firebase-admin';
import { logger } from '../utils/logger';

if (
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_PRIVATE_KEY &&
  process.env.FIREBASE_CLIENT_EMAIL
) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export class NotificationService {
  async sendPushNotification(
    deviceToken: string,
    title: string,
    body: string,
    data?: Record<string, string>
  ) {
    try {
      const message = {
        notification: {
          title,
          body,
        },
        data,
        token: deviceToken,
      };

      const response = await admin.messaging().send(message);
      logger.info(`Notification sent: ${response}`);
      return { success: true };
    } catch (error) {
      logger.error('Push notification failed:', error);
      return { success: false };
    }
  }

  async sendMulticastNotification(
    deviceTokens: string[],
    title: string,
    body: string,
    data?: Record<string, string>
  ) {
    try {
      const message = {
        notification: {
          title,
          body,
        },
        data,
      };

      const response = await admin
        .messaging()
        .sendMulticast({
          ...message,
          tokens: deviceTokens,
        });

      logger.info(`Multicast notification sent to ${response.successCount} devices`);
      return { success: true, successCount: response.successCount };
    } catch (error) {
      logger.error('Multicast notification failed:', error);
      return { success: false };
    }
  }
}
