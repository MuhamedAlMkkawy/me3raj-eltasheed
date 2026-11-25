import { getGoogleAccessToken } from './googleAuth';

const SPREADSHEET_ID = '1tKA3MYCJeXTUjOI_SehSpJ1b4zpGNeLLnYE5adNnSE';

export async function testSheetsConnection(): Promise<{ success: boolean; message: string; sheets?: string[] }> {
  const token = await getGoogleAccessToken();
  if (!token) {
    return {
      success: false,
      message: 'بيانات اعتماد Google Service Account غير متوفرة في ملف البيئة (GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY)',
    };
  }

  try {
    const res: any = await $fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const sheetTitles = res.sheets?.map((s: any) => s.properties?.title) || [];
    return {
      success: true,
      message: 'تم الاتصال بـ Google Sheets بنجاح',
      sheets: sheetTitles,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.data?.error?.message || err?.message || 'فشل الاتصال بـ Google Sheets',
    };
  }
}

export async function getSheetData(range: string): Promise<any[][] | null> {
  const token = await getGoogleAccessToken();
  if (!token) return null;

  try {
    const res: any = await $fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.values || [];
  } catch (err: any) {
    console.error(`[Google Sheets Error] getSheetData(${range}):`, err?.data || err?.message);
    return null;
  }
}

export async function updateSheetData(range: string, values: any[][]): Promise<boolean> {
  const token = await getGoogleAccessToken();
  if (!token) return false;

  try {
    await $fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { values },
      }
    );
    return true;
  } catch (err: any) {
    console.error(`[Google Sheets Error] updateSheetData(${range}):`, err?.data || err?.message);
    return false;
  }
}

export async function appendSheetRow(range: string, values: any[]): Promise<boolean> {
  const token = await getGoogleAccessToken();
  if (!token) return false;

  try {
    await $fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: { values: [values] },
      }
    );
    return true;
  } catch (err: any) {
    console.error(`[Google Sheets Error] appendSheetRow(${range}):`, err?.data || err?.message);
    return false;
  }
}
