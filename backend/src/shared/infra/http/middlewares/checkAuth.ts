import ClientError from '@shared/errors/ClientError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

const checkAuth = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const bearerToken = request.headers.authorization;

    if (!bearerToken) {
        throw new ClientError('You need to be logged in to use this function!');
    }

    const [, jwtToken] = bearerToken.split(' ');

    try {
        const decodedToken = verify(jwtToken, authConfig.secret);

        const { sub } = decodedToken as ITokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new ClientError('Invalid JWT!');
    }
};

export default checkAuth;
