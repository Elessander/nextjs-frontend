import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND = process.env.BACKEND_URL ?? 'http://backend:3001';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${BACKEND}/todos/${params.id}`, { method: 'DELETE' });
  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}
