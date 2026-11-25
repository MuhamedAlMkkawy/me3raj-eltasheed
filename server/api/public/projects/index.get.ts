import { defineEventHandler, getQuery } from 'h3';
import { getProjectsList } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const list = await getProjectsList();

  let filtered = list;
  if (query.category && query.category !== 'all') {
    filtered = filtered.filter((p) => p.category === query.category);
  }
  if (query.featured === 'true') {
    filtered = filtered.filter((p) => p.featured);
  }

  return {
    key: 'success',
    data: filtered,
  };
});
