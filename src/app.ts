import express, { Request, Response, Express } from 'express';
import userRouter from './routes/user.route';
import productRouter from './routes/product.route';

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Modernwalk API');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

export default app;
