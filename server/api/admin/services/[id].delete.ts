import { defineEventHandler, getRouterParam, createError } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { deleteServiceItem } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, message: 'معرف الخدمة مطلوب' });

  const ok = await deleteServiceItem(id);
  if (!ok) throw createError({ statusCode: 404, message: 'الخدمة غير موجودة' });

  return {
    key: 'success',
    message: 'تم حذف الخدمة بنجاح',
  };
});
