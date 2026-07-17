import Redis from 'ioredis';
import { logger } from '../utils/logger';

let redisClient: Redis | null = null;

export const initializeRedis = async (): Promise<Redis> => {
  if (redisClient) return redisClient;

  redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });

  redisClient.on('connect', () => logger.info('Redis connected'));
  redisClient.on('error', (err) => logger.error('Redis error:', err));

  return redisClient;
};

export const getRedis = (): Redis => {
  if (!redisClient) {
    throw new Error('Redis not initialized');
  }
  return redisClient;
};
