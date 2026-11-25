import { defineEventHandler, readBody } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { savePageItem } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const body = await readBody(event);
  const created = await savePageItem(body);
  return {
    key: 'success',
    message: 'تم إنشاء الصفحة بنجاح',
    data: created,
  };
});
