export interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  status: string;
  source: string;
  metadata: Record<string, unknown>;
}

export interface NewWaitlistEntry {
  email: string;
  source?: string;
  metadata?: Record<string, unknown>;
}
