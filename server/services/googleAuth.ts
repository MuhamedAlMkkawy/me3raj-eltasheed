import crypto from 'node:crypto';

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

export async function getGoogleAccessToken(): Promise<string | null> {
  const config = useRuntimeConfig();
  const clientEmail = config.googleServiceAccountEmail || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = config.googlePrivateKey || process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return null;
  }

  // Normalize private key newline characters if stored in .env
  privateKey = privateKey.replace(/\\n/g, '\n');

  // Return cached token if valid for at least another 2 minutes
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 120 * 1000) {
    return cachedAccessToken.token;
  }

  try {
    const now = Math.floor(Date.now() / 1000);
    const jwtHeader = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const jwtClaimSet = Buffer.from(
      JSON.stringify({
        iss: clientEmail,
        scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
      })
    ).toString('base64url');

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(`${jwtHeader}.${jwtClaimSet}`);
    const signature = sign.sign(privateKey, 'base64url');

    const assertion = `${jwtHeader}.${jwtClaimSet}.${signature}`;

    const res: any = await $fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      }).toString(),
    });

    if (res && res.access_token) {
      cachedAccessToken = {
        token: res.access_token,
        expiresAt: Date.now() + (res.expires_in || 3600) * 1000,
      };
      return res.access_token;
    }

    return null;
  } catch (err: any) {
    console.error('[Google Auth Error]: Failed to get Google OAuth2 access token:', err?.data || err?.message);
    return null;
  }
}
