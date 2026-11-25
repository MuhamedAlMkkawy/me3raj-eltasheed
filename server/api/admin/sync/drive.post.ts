import { defineEventHandler } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { testDriveConnection } from '~~/server/services/googleDrive';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const result = await testDriveConnection();
  return {
    key: result.success ? 'success' : 'warn',
    message: result.message,
    data: result,
  };
});
