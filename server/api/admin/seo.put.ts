import { defineEventHandler, readBody } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { saveSeoSettings } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const body = await readBody(event);
  const updated = await saveSeoSettings(body);
  return {
    key: 'success',
    message: 'تم حفظ إعدادات محركات البحث SEO بنجاح',
    data: updated,
  };
});
