import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND = process.env.BACKEND_URL ?? 'http://backend:3001';

export async function GET() {
  const res = await fetch(`${BACKEND}/todos`);
  const todos = await res.json();
  return NextResponse.json(todos, { status: res.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res  = await fetch(`${BACKEND}/todos`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  const todo = await res.json();
  return NextResponse.json(todo, { status: res.status });
}
