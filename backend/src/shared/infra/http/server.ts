import 'reflect-metadata';
import 'express-async-errors';
import '../typeorm';
import '../../container/providers';

import { config as configEnvironmentVariables } from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import ClientError from '@shared/errors/ClientError';
import routes from './routes/index.routes';

configEnvironmentVariables();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof ClientError) {
        return response.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        statusCode: 500,
        message:
            'The server found an unexpected error! Please, check the data sent and try again.',
    });
});

app.listen(process.env.APP_API_PORT || 3000, () => {
    console.log(`Backend running on port ${process.env.APP_API_PORT || 3000}`);
});
