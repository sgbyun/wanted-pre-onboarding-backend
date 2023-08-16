import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PostRepository = {
  async createPost(user, title, body) {
    try {
      return await prisma.posts.create({
        data: {
          title,
          body,
          author_email: user,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async getTotalPostsCount() {
    try {
      //deleted_at이 null인것만 반환해 soft delete 된것은 제외
      return await prisma.posts.count({ where: { deleted_at: null } });
    } catch (error) {
      throw error;
    }
  },

  async findPostsByPage(startIndex, postPerPage) {
    try {
      return await prisma.posts.findMany({
        where: { deleted_at: null },
        skip: startIndex,
        take: postPerPage,
      });
    } catch (error) {
      throw error;
    }
  },

  async findPostById(postId) {
    try {
      return await prisma.posts.findUnique({ where: { id: postId, deleted_at: null } });
    } catch (error) {
      throw error;
    }
  },

  async updatePost(postId, title, body) {
    try {
      return await prisma.posts.update({
        where: { id: postId, deleted_at: null },
        data: { title, body, updated_at: new Date(Date.now() + 1000 * 60 * 60 * 9) },
      });
    } catch (error) {
      throw error;
    }
  },

  async deletePostById(postId) {
    try {
      return await prisma.posts.delete({ where: { id: postId } });
    } catch (error) {
      throw error;
    }
  },
};

export { PostRepository };
