import { defineEventHandler } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { getMediaList } from '~~/server/services/storage';
import { listDriveFiles } from '~~/server/services/googleDrive';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);

  // If Google Drive is connected, fetch live files, else fallback to storage
  const driveFiles = await listDriveFiles();
  if (driveFiles && driveFiles.length > 0) {
    return {
      key: 'success',
      data: driveFiles,
    };
  }

  const list = await getMediaList();
  return {
    key: 'success',
    data: list,
  };
});
