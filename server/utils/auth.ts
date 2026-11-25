import { H3Event, getHeader, getCookie, createError } from 'h3';
import crypto from 'node:crypto';
import type { User, UserRole } from '~/types';

const ALGORITHM = 'sha256';

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, combinedHash: string): boolean {
  try {
    const [salt, originalHash] = combinedHash.split(':');
    if (!salt || !originalHash) return false;
    const testHash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(originalHash, 'hex'), Buffer.from(testHash, 'hex'));
  } catch {
    return false;
  }
}

export function generateToken(payload: { id: string; email: string; role: UserRole }): string {
  const config = useRuntimeConfig();
  const secret = config.jwtSecret || 'me3raj-tashyeed-secret-key-2026-secure';

  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');

  const signature = crypto
    .createHmac(ALGORITHM, secret)
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): { id: string; email: string; role: UserRole } | null {
  try {
    const config = useRuntimeConfig();
    const secret = config.jwtSecret || 'me3raj-tashyeed-secret-key-2026-secure';

    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;

    const expectedSignature = crypto
      .createHmac(ALGORITHM, secret)
      .update(`${header}.${body}`)
      .digest('base64url');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function requireAuthUser(event: H3Event): Promise<{ id: string; email: string; role: UserRole }> {
  let token: string | undefined;

  const authHeader = getHeader(event, 'authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  if (!token) {
    const cookieToken = getCookie(event, 'auth_token');
    if (cookieToken) token = cookieToken;
  }

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      data: { key: 'unauthenticated', message: 'يرجى تسجيل الدخول أولاً' },
    });
  }

  const payload = verifyToken(token);
  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      data: { key: 'unauthenticated', message: 'جلسة العمل غير صالحة أو منتهية' },
    });
  }

  return payload;
}
