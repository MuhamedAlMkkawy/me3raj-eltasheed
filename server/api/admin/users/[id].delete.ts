import { defineEventHandler, getRouterParam, createError } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { deleteUserItem } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  const current = await requireAuthUser(event);
  if (current.role !== 'super_admin') {
    throw createError({ statusCode: 403, message: 'صلاحيات غير كافية لحذف المستخدمين' });
  }

  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, message: 'معرف المستخدم مطلوب' });

  if (current.id === id) {
    throw createError({ statusCode: 400, message: 'لا يمكنك حذف حسابك الحالي' });
  }

  const ok = await deleteUserItem(id);
  if (!ok) throw createError({ statusCode: 400, message: 'لا يمكن حذف هذا المستخدم أو أنه غير موجود' });

  return {
    key: 'success',
    message: 'تم حذف المستخدم بنجاح',
  };
});
