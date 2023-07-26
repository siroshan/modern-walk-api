import express, { Request, Response, Express } from 'express';
import userRouter from './routes/user.route';

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Modernwalk API');
});

app.use('/api/v1/users', userRouter);

export default app;
