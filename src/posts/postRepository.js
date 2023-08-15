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
};

export { PostRepository };
