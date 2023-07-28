import express, { Request, Response } from 'express';
import ProductController from '../controllers/product.controller';

const productRouter = express.Router();
const productsController = new ProductController();

productRouter.post('/', (req: Request, res: Response) => {
  const {  title, description, image, category, price } = req.body;
  const { status, data, message } = productsController.createProduct({
    title,
    description,
    image,
    category,
    price,
  });
  return res.status(status).send({ data, message });
});

productRouter.get('/', (req: Request, res: Response) => {
  const { status, data, message } = productsController.getAllProducts();
  return res.status(status).send({ data, message });
});

productRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, data, message } = productsController.getProductById(
    String(id)
  );
  return res.status(status).send({ data, message });
});

productRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, data, message } = productsController.deleteProductById(
    String(id)
  );
  return res.status(status).send({ data, message });
});

export default productRouter;
