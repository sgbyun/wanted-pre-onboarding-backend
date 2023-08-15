import { Router } from 'express';
import { PostController } from './postController.js';
import { loginValidation } from '../middlewares/loginValidation.js';
const PostRouter = Router();

PostRouter.post('/posts', loginValidation, PostController.createPost);

//PostRouter.get('/posts', PostController.getPosts);

//PostRouter.get('/posts/:id', PostController.selectPost);

//PostRouter.patch('/posts', loginValidation, PostController.patchPost);

//PostRouter.delete('/posts/:id', loginValidation, PostController.deletePost);

export { PostRouter };
