import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for emails (for demo - replace with database later)
let waitlistEmails: Array<{ id: number; email: string; created_at: string }> = [];

export async function GET() {
  try {
    return NextResponse.json({ 
      waitlist: waitlistEmails,
      count: waitlistEmails.length 
    });
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json({ error: 'Failed to fetch waitlist' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if email already exists
    if (waitlistEmails.some(entry => entry.email === email)) {
      return NextResponse.json({ error: 'Email already exists in waitlist' }, { status: 409 });
    }

    // Add email to waitlist
    const newEntry = {
      id: waitlistEmails.length + 1,
      email: email,
      created_at: new Date().toISOString()
    };
    
    waitlistEmails.push(newEntry);

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully added to waitlist',
      id: newEntry.id 
    });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
