import jwt from 'jsonwebtoken';
import 'dotenv/config';

function loginValidation(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers['authorization']?.split(' ')[1] ?? 'null';
  // 토큰이 "null" 일 경우, 로그인이 필요한 서비스 사용을 제한함.
  if (userToken === 'null') {
    return res.status(400).send('로그인한 유저만 사용할 수 있는 서비스입니다.');
  }
  // 토큰이 정상적이면 토큰에 담긴 이메일 추출후 req.user에 담아 다음 미들웨어 또는 라우트 핸들러로 진행
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret_key';
    const jwtDecoded = jwt.verify(userToken, secretKey);
    req.user = jwtDecoded.email;
    next();
  } catch (error) {
    res.status(400).send('정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.');
    return;
  }
}

export { loginValidation };
