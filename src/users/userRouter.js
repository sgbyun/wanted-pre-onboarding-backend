import { Router } from 'express';
import { UserController } from './userController.js';
import { userValidation } from '../middlewares/userValidation.js';
const UserRouter = Router();

UserRouter.post('/users/register', userValidation, UserController.userRegister);

UserRouter.post('/users/login', userValidation, UserController.userLogin);

export { UserRouter };
