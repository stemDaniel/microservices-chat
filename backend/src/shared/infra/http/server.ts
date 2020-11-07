import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import '../typeorm';
import '../../container/providers';

import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';

import routes from './routes/index.routes';
import estabilishWSAttachedOnHTTP from './ws';
import handleErrors from './middlewares/handleErrors';

const app = express();
const server = http.createServer(app);
const serverPort = process.env.APP_API_PORT || 3000;
const publicFolder = path.resolve(__dirname, '..', '..', '..', '..', 'public');

estabilishWSAttachedOnHTTP(server);

app.use(express.static(publicFolder));
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handleErrors);

server.listen(serverPort, () => {
    console.log(`Backend running on port ${serverPort}`); // eslint-disable-line
});
