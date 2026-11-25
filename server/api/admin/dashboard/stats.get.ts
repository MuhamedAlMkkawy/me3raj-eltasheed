import { defineEventHandler } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { getDashboardOverviewStats } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const stats = await getDashboardOverviewStats();
  return {
    key: 'success',
    data: stats,
  };
});
