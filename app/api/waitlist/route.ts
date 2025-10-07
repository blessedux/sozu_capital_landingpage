import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for demo purposes
// In production, this should be replaced with a proper database
let waitlistEmails: Array<{ id: number; email: string; created_at: string }> = [];

export async function GET() {
  try {
    console.log('GET /api/waitlist - Fetching waitlist');
    return NextResponse.json({ 
      waitlist: waitlistEmails || [],
      count: (waitlistEmails || []).length 
    });
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch waitlist',
      waitlist: [],
      count: 0
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/waitlist - Processing request');
    
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required and must be a string' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Initialize array if it doesn't exist (serverless safety)
    if (!waitlistEmails) {
      waitlistEmails = [];
    }

    // Check if email already exists
    if (waitlistEmails.some(entry => entry.email.toLowerCase() === trimmedEmail)) {
      return NextResponse.json({ error: 'Email already exists in waitlist' }, { status: 409 });
    }

    // Add email to waitlist
    const newEntry = {
      id: waitlistEmails.length + 1,
      email: trimmedEmail,
      created_at: new Date().toISOString()
    };
    
    waitlistEmails.push(newEntry);
    console.log(`Successfully added email: ${trimmedEmail}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully added to waitlist',
      id: newEntry.id 
    });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
