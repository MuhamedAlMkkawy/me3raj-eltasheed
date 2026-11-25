import { defineEventHandler, getRouterParam, createError } from 'h3';
import { getServiceBySlug } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, message: 'معرف الخدمة مطلوب' });
  }

  const service = await getServiceBySlug(slug);
  if (!service) {
    throw createError({ statusCode: 404, message: 'الخدمة غير موجودة' });
  }

  return {
    key: 'success',
    data: service,
  };
});
