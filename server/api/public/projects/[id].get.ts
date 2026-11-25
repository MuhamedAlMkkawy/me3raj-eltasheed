import { defineEventHandler, getRouterParam, createError } from 'h3';
import { getProjectById } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) {
    throw createError({ statusCode: 400, message: 'معرف المشروع مطلوب' });
  }

  const project = await getProjectById(id);
  if (!project) {
    throw createError({ statusCode: 404, message: 'المشروع غير موجود' });
  }

  return {
    key: 'success',
    data: project,
  };
});
