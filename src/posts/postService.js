import { PostRepository } from './postRepository';

const PostService = {
  async createPost(user, title, body) {
    try {
      return await PostRepository.createPost(user, title, body);
    } catch (error) {
      throw error;
    }
  },

  async getTotalPostsCount() {
    try {
      return await PostRepository.getTotalPostsCount();
    } catch (error) {
      throw error;
    }
  },

  async getPostList(startIndex, postPerPage) {
    try {
      return await PostRepository.findPostsByPage(startIndex, postPerPage);
    } catch (error) {
      throw error;
    }
  },
};

export { PostService };
