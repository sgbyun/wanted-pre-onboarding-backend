export function validateEmail(email) {
  return email.includes('@');
}
// 비밀번호 유효성 검사 함수
export function validatePassword(password) {
  // 비밀번호는 최소 8자 이상이어야 합니다.
  return password.length >= 8;
}
