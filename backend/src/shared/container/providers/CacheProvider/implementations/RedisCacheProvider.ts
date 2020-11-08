import RedisClient, { Redis } from 'ioredis';

import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

interface ICache {
    [key: string]: string;
}

class RedisCacheProvider implements ICacheProvider {
    private redisClient: Redis;

    constructor() {
        this.redisClient = new RedisClient(cacheConfig);
    }

    public async save(key: string, value: any): Promise<void> {
        await this.redisClient.set(key, JSON.stringify(value));
    }

    public async recovery<T>(key: string): Promise<T | null> {
        const item = await this.redisClient.get(key);

        if (!item) {
            return null;
        }

        return JSON.parse(item) as T;
    }

    public async invalidate(key: string): Promise<void> {
        await this.redisClient.del(key);
    }
}

export default RedisCacheProvider;
