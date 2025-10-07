const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.join(__dirname, 'waitlist.db');
const db = new sqlite3.Database(dbPath);

// Create waitlist table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'SOZU Capital Backend is running' });
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

  // Insert email into database
  const stmt = db.prepare('INSERT INTO waitlist (email) VALUES (?)');
  stmt.run(email, function(err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(409).json({ error: 'Email already exists in waitlist' });
      }
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to add email to waitlist' });
    }

    res.json({ 
      success: true, 
      message: 'Successfully added to waitlist',
      id: this.lastID 
    });
  });
  stmt.finalize();
});

// Get all waitlist emails (for admin purposes)
app.get('/api/waitlist', (req, res) => {
  db.all('SELECT * FROM waitlist ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch waitlist' });
    }
    res.json({ waitlist: rows });
  });
});

// Get waitlist count
app.get('/api/waitlist/count', (req, res) => {
  db.get('SELECT COUNT(*) as count FROM waitlist', (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to get waitlist count' });
    }
    res.json({ count: row.count });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SOZU Capital Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📧 Waitlist API: http://localhost:${PORT}/api/waitlist`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('✅ Database connection closed');
    }
    process.exit(0);
  });
});
