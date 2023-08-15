import bcrypt from 'bcrypt';
import { UserRepository } from './userRepository';
import jwt from 'jsonwebtoken';

const UserService = {
  async addUser(user) {
    try {
      const hashPassword = await bcrypt.hash(user.password, 10);
      return await UserRepository.createUser(user.email, hashPassword);
    } catch (error) {
      throw error;
    }
  },

  async loginUser(user) {
    try {
      const foundUser = await UserRepository.findUserByEmail(user.email);
      if (!foundUser) {
        throw new Error('이메일과 일치하는 회원을 찾을 수 없습니다.');
      }
      const comparePasswords = await bcrypt.compare(user.password, foundUser.password);
      if (!comparePasswords) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
      const secretKey = process.env.JWT_SECRET_KEY || 'secret_key';
      const token = jwt.sign({ emailId: foundUser.email }, secretKey);
      return token;
    } catch (error) {
      throw error;
    }
  },
};

export { UserService };
