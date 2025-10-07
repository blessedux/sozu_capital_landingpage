import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'OK', 
    message: 'SOZU Capital Backend is running',
    timestamp: new Date().toISOString()
  });
}
