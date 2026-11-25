import { defineEventHandler } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { getWebsiteSettings } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const settings = await getWebsiteSettings();
  return {
    key: 'success',
    data: settings,
  };
});
