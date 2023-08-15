import { validateEmail, validatePassword } from '../utils/registerValidation';
import { logger } from '../utils/winston';
import { UserService } from './userService';

const UserController = {
  async userRegister(req, res) {
    try {
      if (!validateEmail(req.body.email)) {
        return res.status(400).json({ error: '유효한 이메일 주소 형식이 아닙니다.' });
      } else if (!validatePassword(req.body.password)) {
        return res.status(400).json({ error: '비밀번호는 최소 8자 이상이어야 합니다.' });
      }
      const result = await UserService.addUser(req.body);
      logger.info('/users/reigster 성공');
      return res.status(201).json(result);
    } catch (error) {
      logger.error('/users/register 실패');
      res.status(500).json({ error: error.message });
    }
  },
};

export { UserController };
