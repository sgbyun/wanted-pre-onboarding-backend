import { Router } from 'express';
import { UserController } from './userController.js';
const userRouter = Router();

userRouter.post('/users/register', UserController.userRegister);

export { userRouter };
