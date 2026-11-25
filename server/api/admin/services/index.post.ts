import { defineEventHandler, readBody } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { saveServiceItem } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const body = await readBody(event);
  const created = await saveServiceItem(body);
  return {
    key: 'success',
    message: 'تمت إضافة الخدمة بنجاح',
    data: created,
  };
});
