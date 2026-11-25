import { defineEventHandler, readBody, createError } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { saveUserItem, getUserByEmailWithPassword } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  const current = await requireAuthUser(event);
  if (current.role !== 'super_admin') {
    throw createError({ statusCode: 403, message: 'صلاحيات غير كافية لإضافة مستخدمين' });
  }

  const body = await readBody(event);
  if (!body?.email || !body?.password) {
    throw createError({ statusCode: 400, message: 'البريد الإلكتروني وكلمة المرور مطلوبان' });
  }

  const existing = await getUserByEmailWithPassword(body.email);
  if (existing) {
    throw createError({ statusCode: 400, message: 'البريد الإلكتروني مسجل بالفعل' });
  }

  const created = await saveUserItem(body);
  return {
    key: 'success',
    message: 'تمت إضافة المستخدم بنجاح',
    data: created,
  };
});
