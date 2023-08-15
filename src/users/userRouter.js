import { Router } from 'express';
import { UserController } from './userController.js';
const userRouter = Router();

userRouter.post('/users/register', UserController.userRegister);

userRouter.post('/users/login', UserController.userLogin);

export { userRouter };
