import { defineEventHandler, getRouterParam, createError } from 'h3';
import { getPageBySlug } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, message: 'معرف الصفحة مطلوب' });
  }

  const page = await getPageBySlug(slug);
  if (!page || !page.active) {
    throw createError({ statusCode: 404, message: 'الصفحة غير موجودة' });
  }

  return {
    key: 'success',
    data: page,
  };
});
