# NovaLive Backend

A Twitch clone backend built with Express.js, TypeScript, and Prisma.

## Tech Stack

- **Express.js**
- **TypeScript**
- **Prisma ORM** (PostgreSQL)
- **Socket.IO** (Real-time features)
- **JWT** (Authentication)
- **bcryptjs** (Password hashing)
- **Redis** (Caching, sessions)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL 14+
- Redis (optional)
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Database Setup

1. Create a PostgreSQL database:

```bash
createdb novalive
```

2. Update the `DATABASE_URL` in `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/novalive?schema=public"
```

3. Run migrations:

```bash
npx prisma migrate dev --name init
```

4. Generate Prisma client:

```bash
npx prisma generate
```

### Environment Variables

Copy `.env.example` and update the values:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

The server will start on `http://localhost:5000` and Socket.IO on `http://localhost:5001`.

### Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
npm run typecheck
```

## Project Structure

```
src/
├── controllers/      # Request handlers
│   ├── auth.controller.ts
│   └── stream.controller.ts
├── middleware/       # Express middleware
│   └── auth.middleware.ts
├── routes/           # API routes
│   ├── auth.routes.ts
│   └── stream.routes.ts
├── utils/            # Utility functions
│   └── stream-key.ts
└── index.ts          # Server entry point
```

## API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Stream Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/streams` | Create new stream |
| GET | `/api/streams` | List all live streams |
| GET | `/api/streams/:id` | Get stream by ID |
| PUT | `/api/streams/:id` | Update stream |
| DELETE | `/api/streams/:id` | Delete stream |
| GET | `/api/streams/user/:userId` | Get user's streams |
| GET | `/api/streams/key/:streamKey` | Get stream by key |

### Chat Routes (via Socket.IO)

| Event | Description |
|-------|-------------|
| `join-stream` | Join a stream room |
| `send-message` | Send a chat message |
| `new-message` | New message received |
| `viewer-count-update` | Viewer count updated |

## WebSocket Events

### Client to Server

```javascript
// Join a stream
socket.emit('join-stream', streamId);

// Send a message
socket.emit('send-message', {
  streamId: 'stream-id',
  content: 'Hello chat!',
  userId: 'user-id'
});

// Update viewer count
socket.emit('update-viewer-count', {
  streamId: 'stream-id',
  isLive: true
});
```

### Server to Client

```javascript
// New message
socket.on('new-message', (message) => {
  console.log(message);
});

// Viewer count update
socket.on('viewer-count-update', (count) => {
  console.log(`Viewers: ${count}`);
});

// Error
socket.on('error', (error) => {
  console.error(error);
});
```

## Database Schema

See `prisma/schema.prisma` for the complete schema.

Key models:
- `User` - User accounts
- `Stream` - Live streams
- `Message` - Chat messages
- `Follow` - User follows

## Authentication

The backend uses JWT for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

All endpoints return a consistent error format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## License

MIT