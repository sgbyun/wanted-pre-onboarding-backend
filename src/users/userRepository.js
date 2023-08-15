import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UserRepository = {
  async createUser(email, password) {
    try {
      return await prisma.users.create({
        data: {
          email: email,
          password: password,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};

export { UserRepository };
