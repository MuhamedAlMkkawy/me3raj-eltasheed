import { defineEventHandler, getRouterParam, readBody, createError } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { updateMessage } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, message: 'معرف الرسالة مطلوب' });

  const body = await readBody(event);
  const updated = await updateMessage(id, body);
  if (!updated) throw createError({ statusCode: 404, message: 'الرسالة غير موجودة' });

  return {
    key: 'success',
    message: 'تم تحديث حالة الرسالة',
    data: updated,
  };
});
