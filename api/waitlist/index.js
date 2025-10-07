const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize SQLite database - Vercel compatible
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/tmp/waitlist.db' 
  : path.join(__dirname, '../../../backend/waitlist.db');

const db = new sqlite3.Database(dbPath);

// Create waitlist table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
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
  } else if (req.method === 'GET') {
    // Get all waitlist emails (for admin purposes)
    db.all('SELECT * FROM waitlist ORDER BY created_at DESC', (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to fetch waitlist' });
      }
      res.json({ waitlist: rows });
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
