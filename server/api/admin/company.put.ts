import { defineEventHandler, readBody } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { saveCompanyData } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const body = await readBody(event);
  const updated = await saveCompanyData(body);
  return {
    key: 'success',
    message: 'تم تحديث بيانات الشركة بنجاح',
    data: updated,
  };
});
