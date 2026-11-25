import { defineEventHandler } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { getUserById } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  const authPayload = await requireAuthUser(event);
  const user = await getUserById(authPayload.id);

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User Not Found',
      data: { key: 'error', message: 'المستخدم غير موجود' },
    });
  }

  return {
    key: 'success',
    data: user,
  };
});
