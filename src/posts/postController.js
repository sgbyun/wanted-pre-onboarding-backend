import { logger } from '../utils/winston';
import { PostService } from './postService';

const PostController = {
  async createPost(req, res) {
    try {
      const user = req.user;
      const { title, body } = req.body;
      const result = await PostService.createPost(user, title, body);
      logger.info('/posts 게시글 작성 성공');
      return res.status(201).json(result);
    } catch (error) {
      logger.error('/posts 게시글 작성 실패');
      res.status(500).json({ error: error.message });
    }
  },
};

export { PostController };
