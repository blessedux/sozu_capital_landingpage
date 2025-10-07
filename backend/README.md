# SOZU Capital Backend

Simple Express.js backend for collecting waitlist emails.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```
PORT=3001
NODE_ENV=development
```

3. Start the server:

```bash
npm run dev
```

## API Endpoints

- `GET /health` - Health check
- `POST /api/waitlist` - Add email to waitlist
- `GET /api/waitlist` - Get all waitlist emails (admin)
- `GET /api/waitlist/count` - Get waitlist count

## Database

Uses SQLite with a simple `waitlist` table:

- `id` - Primary key
- `email` - Email address (unique)
- `created_at` - Timestamp
