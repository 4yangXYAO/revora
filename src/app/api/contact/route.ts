import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Request tidak valid.' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !message || message.length > 2000) {
    return NextResponse.json({ error: 'Lengkapi nama, email yang valid, dan pesan (maks. 2000 karakter).' }, { status: 400 });
  }

  return NextResponse.json({ message: 'Pesan berhasil diperiksa. Pengiriman email akan diaktifkan nanti.' });
}
