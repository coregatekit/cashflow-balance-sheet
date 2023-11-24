import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';

const app: Application = express();
const NODE_ENV = process.env.NODE_ENV || 'develop';

app.use(cors());
app.use(morgan(NODE_ENV === 'develop' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.send('GOOD');
});

export default app;