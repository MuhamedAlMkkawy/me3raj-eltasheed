import { defineEventHandler, readBody, createError } from 'h3';
import { addContactMessage } from '~~/server/services/storage';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const name = (body?.name || '').trim();
  const phone = (body?.phone || '').trim();
  const email = (body?.email || '').trim();
  const message = (body?.message || '').trim();
  const subject = (body?.subject || '').trim() || 'استفسار من الموقع';
  const company = (body?.company || '').trim();
  const service = (body?.service || '').trim();

  if (!name || !phone || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: { key: 'error', message: 'يرجى ملء الاسم ورقم الهاتف ونص الرسالة' },
    });
  }

  const created = await addContactMessage({
    name,
    phone,
    email: email || `${phone}@client.me3raj.sa`,
    subject,
    message,
    company,
    service,
  });

  return {
    key: 'success',
    message: 'تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا الهندسي في أقرب وقت.',
    data: created,
  };
});
