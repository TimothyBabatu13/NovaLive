# NovaLive Skill

NovaLive is a Twitch clone built with a modern tech stack. This skill provides guidance for working on both the frontend and backend.

## Architecture Overview

```
NovaLive/
├── frontend/          # Next.js + TypeScript + TailwindCSS
│   ├── src/
│   │   ├── app/       # App Router (Next.js 13+)
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   └── public/
├── backend/           # Express.js + TypeScript
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── services/
│   └── dist/
└── docs/              # Documentation
```

## Frontend

### Tech Stack
- **Next.js 14+** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React Hook Form** (form handling)
- **Zustand** (state management)
- **React Query** (data fetching)
- **Socket.IO Client** (real-time features)

### Key Features to Implement
1. **User Authentication**
   - Sign up / Sign in pages
   - OAuth integration (Twitch, Google, GitHub)
   
2. **Live Streaming**
   - Stream player page
   - Stream creation and management
   - Chat integration
   
3. **Browse & Discovery**
   - Featured streams
   - Categories/Games
   - Search functionality
   
4. **User Dashboard**
   - Profile management
   - Stream analytics
   - Following management

### Development Commands

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

### Project Structure

```
frontend/src/
├── app/
│   ├── api/           # API routes (server actions)
│   ├── auth/          # Authentication pages
│   ├── dashboard/     # User dashboard
│   ├── explore/       # Browse streams
│   ├── live/          # Live stream page
│   ├── stream/        # Stream creation
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
├── components/
│   ├── ui/            # Reusable UI components
│   ├── layout/        # Header, Footer, Sidebar
│   ├── stream/        # Stream card, player
│   └── chat/          # Chat components
├── lib/
│   ├── api/           # API client
│   ├── auth/          # Auth utilities
│   ├── socket/        # Socket client
│   └── utils/
└── types/
    ├── api/           # API types
    └── index.ts
```

## Backend

### Tech Stack
- **Express.js**
- **TypeScript**
- **Prisma ORM** (database)
- **PostgreSQL** (primary database)
- **Redis** (caching, sessions)
- **Socket.IO** (real-time chat)
- **JWT** (authentication)
- **Cloudinary** (video storage)

### Key Features to Implement
1. **Authentication API**
   - User registration/login
   - JWT token generation
   - OAuth2 integration
   
2. **Stream Management**
   - Stream CRUD operations
   - Stream key generation
   - Viewer count tracking
   
3. **Chat System**
   - Real-time chat via Socket.IO
   - Message persistence
   - Moderation tools
   
4. **User Features**
   - Following system
   - Notifications
   - Stream analytics

### Development Commands

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

### Project Structure

```
backend/src/
├── controllers/
│   ├── auth.controller.ts
│   ├── stream.controller.ts
│   ├── chat.controller.ts
│   └── user.controller.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── upload.middleware.ts
├── models/
│   └── prisma/        # Generated Prisma client
├── routes/
│   ├── auth.routes.ts
│   ├── stream.routes.ts
│   ├── chat.routes.ts
│   └── user.routes.ts
├── services/
│   ├── auth.service.ts
│   ├── stream.service.ts
│   ├── chat.service.ts
│   └── twitch.service.ts
├── sockets/
│   └── chat.socket.ts
├── utils/
│   ├── error.ts
│   └── validator.ts
└── index.ts           # Server entry point
```

## Database Schema (Prisma)

```prisma
model User {
  id          String    @id @default(cuid())
  email       String    @unique
  username    String    @unique
  password    String?
  avatar      String?
  bio         String?
  isStreaming Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  streams     Stream[]
  followers   Follow[]
  following   Follow[]
  messages    Message[]
}

model Stream {
  id          String   @id @default(cuid())
  title       String
  description String?
  gameId      String?
  thumbnail   String?
  isLive      Boolean  @default(false)
  viewerCount Int      @default(0)
  streamKey   String   @unique
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User     @relation(fields: [userId], references: [id])
  messages    Message[]
}

model Follow {
  id          String   @id @default(cuid())
  userId      String
  followingId String
  createdAt   DateTime @default(now())
  
  user        User     @relation(fields: [userId], references: [id])
  following   User     @relation(fields: [followingId], references: [id])
}

model Message {
  id        String   @id @default(cuid())
  content   String
  userId    String
  streamId  String
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
  stream    Stream   @relation(fields: [streamId], references: [id])
}
```

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/providers` - Get OAuth providers

### Stream Routes
- `GET /api/streams` - List all streams
- `GET /api/streams/:id` - Get stream by ID
- `POST /api/streams` - Create new stream
- `PUT /api/streams/:id` - Update stream
- `DELETE /api/streams/:id` - Delete stream
- `GET /api/streams/user/:userId` - Get user's streams

### Chat Routes
- `GET /api/streams/:streamId/messages` - Get stream messages
- `POST /api/streams/:streamId/messages` - Send message

### User Routes
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/followers` - Get followers
- `POST /api/users/:id/follow` - Follow user

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WS_URL=http://localhost:5001
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/novalive
JWT_SECRET=your_jwt_secret_key
REDIS_URL=redis://localhost:6379
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
PORT=5000
WS_PORT=5001
```

## Common Workflows

### Creating a New Stream
1. User creates stream via dashboard
2. Backend generates unique stream key
3. Frontend connects to RTMP server with stream key
4. Backend starts recording viewer count

### Live Chat
1. User joins stream page
2. Frontend connects to Socket.IO server
3. Messages sent via WebSocket
4. Messages persisted in database
5. Real-time updates to all viewers

### OAuth Login
1. User clicks "Sign in with Twitch"
2. Frontend redirects to Twitch OAuth
3. Backend receives callback with code
4. Backend exchanges code for access token
5. Backend creates/finds user and returns JWT