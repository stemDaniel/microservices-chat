import { config as configEnvironmentVariables } from 'dotenv';
import express from 'express';

import '../typeorm';

configEnvironmentVariables();

const app = express();

app.listen(process.env.APP_API_PORT || 3000, () => {
    console.log(`Backend running on port ${process.env.APP_API_PORT || 3000}`);
});
