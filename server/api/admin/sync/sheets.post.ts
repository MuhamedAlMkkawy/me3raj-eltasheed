import { defineEventHandler } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { testSheetsConnection } from '~~/server/services/googleSheets';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const result = await testSheetsConnection();
  return {
    key: result.success ? 'success' : 'warn',
    message: result.message,
    data: result,
  };
});
