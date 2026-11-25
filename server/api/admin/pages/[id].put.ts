import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { savePageItem } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const updated = await savePageItem({ ...body, id });
  return {
    key: 'success',
    message: 'تم تحديث الصفحة بنجاح',
    data: updated,
  };
});
