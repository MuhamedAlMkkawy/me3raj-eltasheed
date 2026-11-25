import { defineEventHandler } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { getProjectsList } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const list = await getProjectsList();
  return {
    key: 'success',
    data: list,
  };
});
