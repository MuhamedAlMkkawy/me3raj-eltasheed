import { defineEventHandler, getRouterParam, createError } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { deleteMediaItem } from '~~/server/services/storage';
import { deleteDriveFile } from '~~/server/services/googleDrive';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);
  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, message: 'معرف الملف مطلوب' });

  // Delete from Google Drive if possible
  try {
    await deleteDriveFile(id);
  } catch {}

  const ok = await deleteMediaItem(id);
  return {
    key: 'success',
    message: 'تم حذف الملف بنجاح',
  };
});
