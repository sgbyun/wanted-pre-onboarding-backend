import { PostRepository } from './postRepository';

const PostService = {
  async createPost(user, title, body) {
    try {
      return await PostRepository.createPost(user, title, body);
    } catch (error) {
      throw error;
    }
  },
};

export { PostService };
