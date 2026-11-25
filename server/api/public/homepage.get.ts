import { defineEventHandler } from 'h3';
import { getHomepageData } from '~~/server/services/storage';

export default defineEventHandler(async () => {
  const data = await getHomepageData();
  return {
    key: 'success',
    data,
  };
});
