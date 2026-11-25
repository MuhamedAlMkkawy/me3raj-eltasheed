import { defineEventHandler, getRouterParam, readBody, createError } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { saveUserItem } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  const current = await requireAuthUser(event);
  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, message: 'معرف المستخدم مطلوب' });

  if (current.role !== 'super_admin' && current.id !== id) {
    throw createError({ statusCode: 403, message: 'صلاحيات غير كافية لتعديل هذا المستخدم' });
  }

  const body = await readBody(event);
  const updated = await saveUserItem({ ...body, id });

  return {
    key: 'success',
    message: 'تم تحديث بيانات المستخدم بنجاح',
    data: updated,
  };
});
