# NovaLive Frontend

A modern Twitch clone built with Next.js, TypeScript, and TailwindCSS.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React Hook Form**
- **Zustand** (State Management)
- **React Query** (Data Fetching)
- **Socket.IO Client** (Real-time Chat)
- **NextAuth.js** (Authentication)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Copy `.env.local` and update the values:

```bash
cp .env.local.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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
├── app/              # App Router pages
│   ├── api/          # API routes
│   ├── auth/         # Authentication pages
│   ├── dashboard/    # User dashboard
│   ├── explore/      # Browse streams
│   ├── live/         # Live stream page
│   └── layout.tsx    # Root layout
├── components/       # Reusable components
│   ├── ui/           # UI primitives
│   └── layout/       # Layout components
├── lib/              # Utility functions
└── types/            # TypeScript types
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Starts the development server |
| `build` | Builds the application for production |
| `start` | Starts the production server |
| `lint` | Runs ESLint |
| `typecheck` | Runs TypeScript type checking |

## API Integration

The frontend communicates with the backend API at `NEXT_PUBLIC_API_URL`.

All API calls should use the following pattern:

```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/streams`, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
```

## Real-time Features

Socket.IO is used for real-time chat and viewer count updates.

```typescript
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_WS_URL);

socket.on('connect', () => {
  socket.emit('join-stream', streamId);
});

socket.on('new-message', (message) => {
  // Handle new message
});
```

## Styling

The project uses TailwindCSS with custom colors:

- `primary` - Main brand color
- `secondary` - Accent color
- `success` - Success messages
- `warning` - Warning messages
- `danger` - Error messages

## License

MIT