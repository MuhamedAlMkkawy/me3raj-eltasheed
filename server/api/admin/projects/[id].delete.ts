import { defineEventHandler, getRouterParam, createError } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { deleteProjectItem } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, message: 'معرف المشروع مطلوب' });

  const ok = await deleteProjectItem(id);
  if (!ok) throw createError({ statusCode: 404, message: 'المشروع غير موجود' });

  return {
    key: 'success',
    message: 'تم حذف المشروع بنجاح',
  };
});
