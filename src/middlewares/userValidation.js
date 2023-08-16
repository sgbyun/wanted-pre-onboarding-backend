export function userValidation(req, res, next) {
  const { email, password } = req.body;
  if (!email.includes('@')) {
    return res.status(400).json({ error: '유효한 이메일 주소 형식이 아닙니다.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: '비밀번호는 최소 8자 이상이어야 합니다.' });
  }

  // 유효성 검사 통과 시 다음 미들웨어 또는 라우트 핸들러로 진행
  next();
}
