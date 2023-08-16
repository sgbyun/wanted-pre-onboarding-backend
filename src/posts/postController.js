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
      const postPerPage = parseInt(req.query.take) || 10; // 페이지당 게시글수
      const currentPage = parseInt(req.query.page) || 1; // 현재 페이지
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

  async selectPost(req, res) {
    try {
      const postId = parseInt(req.params.id);
      const post = await PostService.getPost(postId);
      return res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async patchPost(req, res) {
    try {
      const user = req.user;
      const { postId, title, body } = req.body;
      const updatedPost = await PostService.updatePost(user, postId, title, body);
      return res.status(201).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deletePost(req, res) {
    try {
      const user = req.user;
      const postId = parseInt(req.params.id);
      await PostService.deletePost(user, postId);
      return res.status(200).json({ message: '게시글 삭제 성공' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export { PostController };
