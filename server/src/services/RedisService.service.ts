import { RedisClientType, createClient } from 'redis';
import Logger from '../helpers/Logger';

class RedisService {
  private static instance: RedisService | null = null;
  private client: RedisClientType | undefined;

  private constructor() {
    if (process.env.REDIS_SERVICE) {
      this.client = createClient({
        url: process.env.REDIS_URL,
      });

      this.client
        .connect()
        .then(() => {
          Logger.info('Redis connected');
        })
        .catch((err) => {
          Logger.error('Redis connection error:', err);
          this.client?.quit(); // Close the connection forcefully
          this.client = undefined; // Reset the client instance
        });
    }
  }

  static getInstance(): RedisService | null {
    if (!RedisService.instance && process.env.REDIS_SERVICE === 'ON') {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  async set(key: string, value: string): Promise<void> {
    if (!this.client) {
      Logger.error('Redis client is not initialized.');
      return;
    }
    await this.client.set(key, value);
  }

  async get(key: string): Promise<string> {
    if (!this.client) {
      Logger.error('Redis client is not initialized.');
      return '';
    }
    return (await this.client.get(key)) || '';
  }

  async del(key: string): Promise<number> {
    if (!this.client) {
      Logger.error('Redis client is not initialized.');
      return 0;
    }
    return (await this.client.del(key)) || 0;
  }
}

export default RedisService;
