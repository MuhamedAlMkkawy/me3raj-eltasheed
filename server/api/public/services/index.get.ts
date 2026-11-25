import { defineEventHandler } from 'h3';
import { getServicesList } from '~~/server/services/storage';

export default defineEventHandler(async () => {
  const list = await getServicesList();
  const activeServices = list.filter((s) => s.active);
  return {
    key: 'success',
    data: activeServices,
  };
});
