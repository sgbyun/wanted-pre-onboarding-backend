import { logger } from '../utils/winston';
import { UserService } from './userService';

const UserController = {
  async userRegister(req, res) {
    try {
      const result = await UserService.addUser(req.body);
      logger.info('/users/reigster 성공');
      return res.status(201).json(result);
    } catch (error) {
      logger.error('/users/register 실패');
      res.status(500).json({ error: error.message });
    }
  },

  async userLogin(req, res) {
    try {
      const result = await UserService.loginUser(req.body);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('/users/login 실패');
      res.status(500).json({ error: error.message });
    }
  },
};

export { UserController };
