import { defineEventHandler, deleteCookie } from 'h3';

export default defineEventHandler((event) => {
  deleteCookie(event, 'auth_token');
  return {
    key: 'success',
    message: 'تم تسجيل الخروج بنجاح',
  };
});
