import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import router from './routes';

const app: Application = express();
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

export default app;