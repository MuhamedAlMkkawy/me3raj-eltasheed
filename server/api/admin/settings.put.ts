import { defineEventHandler, readBody } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { saveWebsiteSettings } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const body = await readBody(event);
  const updated = await saveWebsiteSettings(body);
  return {
    key: 'success',
    message: 'تم حفظ إعدادات الموقع بنجاح',
    data: updated,
  };
});
