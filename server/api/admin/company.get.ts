import { defineEventHandler } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { getCompanyData } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const data = await getCompanyData();
  return {
    key: 'success',
    data,
  };
});
