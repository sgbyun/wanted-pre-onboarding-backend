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

  async getPosts(req, res) {
    try {
      const postPerPage = parseInt(req.query.take); // 페이지당 게시글수
      const currentPage = parseInt(req.query.page); // 현재 페이지
      const totalPostsCount = await PostService.getTotalPostsCount();
      let startIndex = (currentPage - 1) * postPerPage;
      if (startIndex < 0) {
        startIndex = 0;
      }
      const postList = await PostService.getPostList(startIndex, postPerPage);
      return res.status(200).json({
        totalPostsCount,
        page: currentPage,
        totalPages: Math.ceil(totalPostsCount / postPerPage),
        data: postList,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export { PostController };
