import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our waitlist table
export interface WaitlistEntry {
  id: number
  email: string
  created_at: string
  updated_at: string
  status: string
  source: string
  metadata: Record<string, any>
}

export interface NewWaitlistEntry {
  email: string
  source?: string
  metadata?: Record<string, any>
}
