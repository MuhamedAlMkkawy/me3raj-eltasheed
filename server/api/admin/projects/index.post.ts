import { defineEventHandler, readBody } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { saveProjectItem } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const body = await readBody(event);
  const created = await saveProjectItem(body);
  return {
    key: 'success',
    message: 'تمت إضافة المشروع بنجاح',
    data: created,
  };
});
