import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('GET /api/health - Health check requested');
    return NextResponse.json({ 
      status: 'OK', 
      message: 'SOZU Capital Backend is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Error in health check:', error);
    return NextResponse.json({ 
      status: 'ERROR', 
      message: 'Health check failed',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
