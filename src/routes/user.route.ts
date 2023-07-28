import express, { Request, Response } from 'express';
import UserController from '../controllers/user.controller';

const userRouter = express.Router();
const usersController = new UserController();

userRouter.post('/', (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const { status, data, message } = usersController.createUser({
    firstName,
    lastName,
    email,
    password,
  });
  return res.status(status).send({ data, message });
});

userRouter.get('/', (req: Request, res: Response) => {
  const { status, data, message } = usersController.getAllUsers();
  return res.status(status).send({ data, message });
});

userRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.query;
  const { status, data, message } = usersController.getUserById(String(id));
  return res.status(status).send({ data, message });
});

userRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.query;
  const { status, data, message } = usersController.getUserById(String(id));
  return res.status(status).send({ data, message });
});

export default userRouter;
