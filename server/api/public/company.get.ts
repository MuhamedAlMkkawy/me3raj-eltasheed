import { defineEventHandler } from 'h3';
import { getCompanyData } from '~~/server/services/storage';

export default defineEventHandler(async () => {
  const data = await getCompanyData();
  return {
    key: 'success',
    data,
  };
});
