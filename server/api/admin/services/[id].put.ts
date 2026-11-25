import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { saveServiceItem } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const updated = await saveServiceItem({ ...body, id });
  return {
    key: 'success',
    message: 'تم تحديث بيانات الخدمة بنجاح',
    data: updated,
  };
});
