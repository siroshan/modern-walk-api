import express, { Request, Response } from 'express';
import CategoryController from '../controllers/category.controller';

const categoryRouter = express.Router();
const categorysController = new CategoryController();

categoryRouter.post('/', (req: Request, res: Response) => {
  const { title } = req.body;
  const { status, data, message } = categorysController.createCategory({
    title
  });
  return res.status(status).send({ data, message });
});

categoryRouter.get('/', (req: Request, res: Response) => {
  const { status, data, message } = categorysController.getAllCategorys();
  return res.status(status).send({ data, message });
});

categoryRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, data, message } = categorysController.getCategoryById(
    String(id)
  );
  return res.status(status).send({ data, message });
});

categoryRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, data, message } = categorysController.deleteCategoryById(
    String(id)
  );
  return res.status(status).send({ data, message });
});

export default categoryRouter;
