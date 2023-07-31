import express, { Request, Response, Express } from 'express';
import userRouter from './routes/user.route';
import productRouter from './routes/product.route';
import categoryRouter from './routes/category.route';

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Modernwalk API');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);

export default app;
