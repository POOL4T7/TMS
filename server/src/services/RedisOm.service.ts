import { RedisClientType, createClient } from "redis";
import { Client } from "redis-om";

class RedisConnection {
  private client: RedisClientType | undefined;
  private static redisOMClient: Client | undefined;

  private constructor() {}

  static async initialize(): Promise<Client> {
    const url = process.env.REDIS_URL;
    try {
      if (
        !RedisConnection.redisOMClient &&
        process.env.REDIS_SERVICE === "ON"
      ) {
        console.log("trying to connect with redis...");
        const client = createClient({ url: url });
        await client.connect();
        RedisConnection.redisOMClient = await new Client().use(client);
      }
      return RedisConnection.redisOMClient!;
    } catch (e: any) {
      console.log("Redis connection error: ", e);
      throw Error(e);
    }
  }

  public static getClient(): Client {
    if (!RedisConnection.redisOMClient) {
      throw new Error("Redis client is not initialized");
    }
    return RedisConnection.redisOMClient;
  }
}

export default RedisConnection;
