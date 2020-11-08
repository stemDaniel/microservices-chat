import { Request, Response, NextFunction } from 'express';

import ClientError from '@shared/errors/ClientError';

const handleErrors = (
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction,
): Response => {
    if (err instanceof ClientError) {
        return response.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    console.log(err); // eslint-disable-line

    return response.status(500).json({
        statusCode: 500,
        message:
            'The server found an unexpected error! Please, check the data sent and try again.',
    });
};

export default handleErrors;
