import bcrypt from 'bcrypt';
import { UserRepository } from './userRepository';

const UserService = {
  async addUser(user) {
    try {
      const hashPassword = await bcrypt.hash(user.password, 10);
      return await UserRepository.createUser(user.email, hashPassword);
    } catch (error) {
      throw error;
    }
  },
};

export { UserService };
