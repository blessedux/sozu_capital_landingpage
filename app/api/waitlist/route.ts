import { NextRequest, NextResponse } from 'next/server';
import { supabase, NewWaitlistEntry } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('GET /api/waitlist - Fetching waitlist from Supabase');
    
    const { data, error, count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ 
        error: 'Failed to fetch waitlist',
        waitlist: [],
        count: 0
      }, { status: 500 });
    }

    return NextResponse.json({ 
      waitlist: data || [],
      count: count || 0
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

    const { email, source = 'website', metadata = {} } = body;

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

    // Check if email already exists in Supabase
    const { data: existingEntry } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', trimmedEmail)
      .single();

    if (existingEntry) {
      return NextResponse.json({ error: 'Email already exists in waitlist' }, { status: 409 });
    }

    // Add email to Supabase
    const newEntry: NewWaitlistEntry = {
      email: trimmedEmail,
      source,
      metadata: {
        ...metadata,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        timestamp: new Date().toISOString()
      }
    };

    const { data, error } = await supabase
      .from('waitlist')
      .insert([newEntry])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ 
        error: 'Failed to add email to waitlist',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }, { status: 500 });
    }

    console.log(`Successfully added email to Supabase: ${trimmedEmail}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully added to waitlist',
      id: data.id,
      email: data.email
    });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
