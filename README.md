# NovaLive

A Twitch clone built with modern web technologies. Watch and stream live content with real-time chat.

## Architecture

```
NovaLive/
├── frontend/          # Next.js + TypeScript + TailwindCSS
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   └── public/
├── backend/           # Express.js + TypeScript
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.ts
│   ├── prisma/
│   └── dist/
└── docs/              # Documentation
```

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React Hook Form**
- **Zustand** (State Management)
- **React Query** (Data Fetching)
- **Socket.IO Client** (Real-time Chat)

### Backend
- **Express.js**
- **TypeScript**
- **Prisma ORM** (PostgreSQL)
- **Socket.IO** (Real-time features)
- **JWT** (Authentication)
- **bcryptjs** (Password hashing)

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NovaLive
```

2. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Set up the database:
```bash
# Create PostgreSQL database
createdb novalive

# Run migrations
npx prisma migrate dev --name init
npx prisma generate
```

4. Configure environment variables:
```bash
# Frontend
cp frontend/.env.local.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

5. Start the development servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Development

### Frontend Commands

```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript type checking
```

### Backend Commands

```bash
npm run dev         # Start dev server with hot reload
npm run build       # Build TypeScript
npm run start       # Start production server
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript type checking
npx prisma studio   # Open Prisma Studio
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Streams
- `GET /api/streams` - List all live streams
- `GET /api/streams/:id` - Get stream by ID
- `POST /api/streams` - Create new stream
- `PUT /api/streams/:id` - Update stream
- `DELETE /api/streams/:id` - Delete stream

### Chat (Socket.IO)
- `join-stream` - Join a stream room
- `send-message` - Send chat message
- `new-message` - New message event
- `viewer-count-update` - Viewer count update

## License

MIT