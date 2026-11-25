import { defineEventHandler, getRouterParam, createError } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { deletePageItem } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, message: 'معرف الصفحة مطلوب' });

  const ok = await deletePageItem(id);
  if (!ok) throw createError({ statusCode: 404, message: 'الصفحة غير موجودة' });

  return {
    key: 'success',
    message: 'تم حذف الصفحة بنجاح',
  };
});
