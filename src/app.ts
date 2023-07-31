import express, { Request, Response, Express } from 'express';
import swaggerUi from "swagger-ui-express";
import userRouter from './routes/user.route';
import productRouter from './routes/product.route';
import categoryRouter from './routes/category.route';

const app: Express = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);

app.use(express.static('dist'));
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Modernwalk API');
});

export default app;
