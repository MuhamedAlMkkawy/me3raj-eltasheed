import { getGoogleAccessToken } from './googleAuth';
import type { MediaItem } from '~/types';

const DRIVE_FOLDER_ID = '1nv5sBNxbN-jg7-qXPqRdjBAMMkx5_Tqz';

export async function testDriveConnection(): Promise<{ success: boolean; message: string; filesCount?: number }> {
  const token = await getGoogleAccessToken();
  if (!token) {
    return {
      success: false,
      message: 'بيانات اعتماد Google Service Account غير متوفرة في ملف البيئة',
    };
  }

  try {
    const res: any = await $fetch(
      `https://www.googleapis.com/drive/v3/files?q='${DRIVE_FOLDER_ID}'+in+parents+and+trashed=false&pageSize=10&fields=files(id,name)`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: 'تم الاتصال بـ Google Drive بنجاح',
      filesCount: res.files?.length || 0,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.data?.error?.message || err?.message || 'فشل الاتصال بـ Google Drive',
    };
  }
}

export async function listDriveFiles(): Promise<MediaItem[] | null> {
  const token = await getGoogleAccessToken();
  if (!token) return null;

  try {
    const res: any = await $fetch(
      `https://www.googleapis.com/drive/v3/files?q='${DRIVE_FOLDER_ID}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,size,webViewLink,thumbnailLink,createdTime)&orderBy=createdTime+desc&pageSize=100`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return (res.files || []).map((f: any) => ({
      id: f.id,
      fileId: f.id,
      name: f.name,
      mimeType: f.mimeType,
      size: parseInt(f.size || '0', 10),
      webViewLink: f.webViewLink,
      thumbnailLink: f.thumbnailLink || `https://lh3.googleusercontent.com/d/${f.id}`,
      downloadUrl: `https://drive.google.com/uc?export=view&id=${f.id}`,
      driveFolderId: DRIVE_FOLDER_ID,
      createdAt: f.createdTime,
    }));
  } catch (err: any) {
    console.error('[Google Drive Error] listDriveFiles:', err?.data || err?.message);
    return null;
  }
}

export async function uploadFileToDrive(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<MediaItem | null> {
  const token = await getGoogleAccessToken();
  if (!token) return null;

  try {
    const metadata = {
      name: fileName,
      parents: [DRIVE_FOLDER_ID],
    };

    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const multipartRequestBody = Buffer.concat([
      Buffer.from(
        delimiter +
          'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          `Content-Type: ${mimeType}\r\n\r\n`
      ),
      fileBuffer,
      Buffer.from(closeDelimiter),
    ]);

    const res: any = await $fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink,thumbnailLink,createdTime',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      }
    );

    // Make the file publicly viewable so images render directly on the public site
    try {
      await $fetch(`https://www.googleapis.com/drive/v3/files/${res.id}/permissions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          role: 'reader',
          type: 'anyone',
        },
      });
    } catch {
      // Permission might already be inherited from the parent folder
    }

    return {
      id: res.id,
      fileId: res.id,
      name: res.name,
      mimeType: res.mimeType,
      size: parseInt(res.size || `${fileBuffer.length}`, 10),
      webViewLink: res.webViewLink,
      thumbnailLink: res.thumbnailLink || `https://lh3.googleusercontent.com/d/${res.id}`,
      downloadUrl: `https://drive.google.com/uc?export=view&id=${res.id}`,
      driveFolderId: DRIVE_FOLDER_ID,
      createdAt: res.createdTime || new Date().toISOString(),
    };
  } catch (err: any) {
    console.error('[Google Drive Error] uploadFileToDrive:', err?.data || err?.message);
    return null;
  }
}

export async function deleteDriveFile(fileId: string): Promise<boolean> {
  const token = await getGoogleAccessToken();
  if (!token) return false;

  try {
    await $fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (err: any) {
    console.error('[Google Drive Error] deleteDriveFile:', err?.data || err?.message);
    return false;
  }
}
