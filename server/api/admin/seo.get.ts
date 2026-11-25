import { defineEventHandler } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { getSeoSettings } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const seo = await getSeoSettings();
  return {
    key: 'success',
    data: seo,
  };
});
