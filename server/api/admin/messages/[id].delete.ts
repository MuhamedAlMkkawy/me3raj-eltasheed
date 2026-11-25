import { defineEventHandler, getRouterParam, createError } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { deleteMessage } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, message: 'معرف الرسالة مطلوب' });

  const ok = await deleteMessage(id);
  if (!ok) throw createError({ statusCode: 404, message: 'الرسالة غير موجودة' });

  return {
    key: 'success',
    message: 'تم حذف الرسالة بنجاح',
  };
});
