const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for emails (for demo - replace with database later)
let waitlistEmails = [];

// Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'SOZU Capital Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Add email to waitlist
app.post('/api/waitlist', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Check if email already exists
  if (waitlistEmails.some(entry => entry.email === email)) {
    return res.status(409).json({ error: 'Email already exists in waitlist' });
  }

  // Add email to waitlist
  const newEntry = {
    id: waitlistEmails.length + 1,
    email: email,
    created_at: new Date().toISOString()
  };
  
  waitlistEmails.push(newEntry);

  res.json({ 
    success: true, 
    message: 'Successfully added to waitlist',
    id: newEntry.id 
  });
});

// Get all waitlist emails (for admin purposes)
app.get('/api/waitlist', (req, res) => {
  res.json({ 
    waitlist: waitlistEmails,
    count: waitlistEmails.length 
  });
});

// Get waitlist count
app.get('/api/waitlist/count', (req, res) => {
  res.json({ count: waitlistEmails.length });
});

// Start server only if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 SOZU Capital Backend running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📧 Waitlist API: http://localhost:${PORT}/api/waitlist`);
  });
}

// Export for Vercel
module.exports = app;
