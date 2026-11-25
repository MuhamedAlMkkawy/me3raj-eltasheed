import { defineEventHandler, readMultipartFormData, createError } from 'h3';
import { requireAuthUser } from '~~/server/utils/auth';
import { uploadFileToDrive } from '~~/server/services/googleDrive';
import { saveMediaItem } from '~~/server/services/storage';
import fs from 'node:fs';
import path from 'node:path';

export default defineEventHandler(async (event) => {
  await requireAuthUser(event);

  const multipart = await readMultipartFormData(event);
  if (!multipart || multipart.length === 0) {
    throw createError({ statusCode: 400, message: 'لم يتم إرسال أي ملف' });
  }

  const uploadedItems = [];

  for (const part of multipart) {
    if (!part.filename || !part.data) continue;

    const fileName = part.filename;
    const mimeType = part.type || 'application/octet-stream';
    const buffer = part.data;

    // Try uploading to Google Drive first
    let mediaItem = await uploadFileToDrive(buffer, fileName, mimeType);

    // If Google Drive credentials not available, save locally in public/uploads
    if (!mediaItem) {
      const uploadsDir = path.resolve(process.cwd(), 'public/uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const safeName = `${Date.now()}-${fileName.replace(/[^\w.-]/g, '_')}`;
      const filePath = path.join(uploadsDir, safeName);
      fs.writeFileSync(filePath, buffer);

      const localUrl = `/uploads/${safeName}`;

      mediaItem = {
        id: `med_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        fileId: safeName,
        name: fileName,
        mimeType,
        size: buffer.length,
        webViewLink: localUrl,
        thumbnailLink: localUrl,
        downloadUrl: localUrl,
        createdAt: new Date().toISOString(),
      };
    }

    await saveMediaItem(mediaItem);
    uploadedItems.push(mediaItem);
  }

  return {
    key: 'success',
    message: `تم رفع ${uploadedItems.length} ملف(ات) بنجاح`,
    data: uploadedItems,
  };
});
