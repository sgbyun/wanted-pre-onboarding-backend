import { Router } from 'express';
import { UserController } from './userController.js';
import { userValidation } from '../middlewares/userValidation.js';
const userRouter = Router();

userRouter.post('/users/register', userValidation, UserController.userRegister);

userRouter.post('/users/login', userValidation, UserController.userLogin);

export { userRouter };
