import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';

import './databases';
import router from './routes';
import { ENV } from './configs';
import redisClient from './databases/redis';

const app: Application = express();

redisClient.connect(); // Open redis connection
app.use(cors());
app.use(morgan(ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

export default app;
