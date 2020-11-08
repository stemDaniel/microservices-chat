import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
});

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 5,
    duration: 1,
});

const rateLimiterMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    rateLimiter
        .consume(request.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            response.status(429).send('Too many requests!');
        });
};

export default rateLimiterMiddleware;
