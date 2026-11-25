import { defineEventHandler, readBody } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { saveHomepageData } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const body = await readBody(event);
  const updated = await saveHomepageData(body);
  return {
    key: 'success',
    message: 'تم حفظ محتوى الصفحة الرئيسية بنجاح',
    data: updated,
  };
});
