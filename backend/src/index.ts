import express, { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import streamRoutes from './routes/stream.routes';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/streams', streamRoutes);

// Socket.IO connection
io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('join-stream', (streamId: string) => {
    socket.join(streamId);
    console.log(`User ${socket.id} joined stream ${streamId}`);
  });

  socket.on('send-message', async (data: { streamId: string; content: string; userId: string }) => {
    const { streamId, content, userId } = data;

    try {
      const message = await prisma.message.create({
        data: {
          content,
          streamId,
          userId,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
      });

      io.to(streamId).emit('new-message', message);
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('update-viewer-count', async (data: { streamId: string; isLive: boolean }) => {
    const { streamId, isLive } = data;

    try {
      await prisma.stream.update({
        where: { id: streamId },
        data: {
          isLive,
          viewerCount: {
            increment: isLive ? 1 : -1,
          },
        },
      });

      const stream = await prisma.stream.findUnique({
        where: { id: streamId },
        select: { viewerCount: true },
      });

      io.to(streamId).emit('viewer-count-update', stream?.viewerCount || 0);
    } catch (error) {
      console.error('Error updating viewer count:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
const WS_PORT = process.env.WS_PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.listen(WS_PORT, () => {
  console.log(`Socket.IO server is running on port ${WS_PORT}`);
});

export { app, io, prisma };
