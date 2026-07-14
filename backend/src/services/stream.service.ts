import { PrismaClient } from '@prisma/client';
import { generateStreamKey } from '../utils/stream-key';

const prisma = new PrismaClient();

export class StreamService {
  static async create(data: {
    title: string;
    description?: string;
    gameId?: string;
    userId: string;
  }) {
    const streamKey = generateStreamKey();

    const stream = await prisma.stream.create({
      data: {
        title: data.title,
        description: data.description,
        gameId: data.gameId,
        streamKey,
        userId: data.userId,
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

    return stream;
  }

  static async getAllLive() {
    const streams = await prisma.stream.findMany({
      where: { isLive: true },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        viewerCount: 'desc',
      },
    });

    return streams;
  }

  static async getById(id: string) {
    const stream = await prisma.stream.findUnique({
      where: { id },
      include: {
        user: true,
        messages: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 50,
        },
      },
    });

    return stream;
  }

  static async getByKey(streamKey: string) {
    const stream = await prisma.stream.findUnique({
      where: { streamKey },
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

    return stream;
  }

  static async getByUser(userId: string) {
    const streams = await prisma.stream.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return streams;
  }

  static async update(id: string, data: {
    title?: string;
    description?: string;
    gameId?: string;
    isLive?: boolean;
  }, userId: string) {
    const stream = await prisma.stream.findUnique({
      where: { id },
    });

    if (!stream) {
      throw new Error('Stream not found');
    }

    if (stream.userId !== userId) {
      throw new Error('You can only update your own streams');
    }

    const updatedStream = await prisma.stream.update({
      where: { id },
      data,
    });

    return updatedStream;
  }

  static async delete(id: string, userId: string) {
    const stream = await prisma.stream.findUnique({
      where: { id },
    });

    if (!stream) {
      throw new Error('Stream not found');
    }

    if (stream.userId !== userId) {
      throw new Error('You can only delete your own streams');
    }

    await prisma.stream.delete({
      where: { id },
    });

    return true;
  }

  static async updateViewerCount(streamId: string, isLive: boolean) {
    const stream = await prisma.stream.update({
      where: { id: streamId },
      data: {
        isLive,
        viewerCount: {
          increment: isLive ? 1 : -1,
        },
      },
      select: {
        viewerCount: true,
      },
    });

    return stream.viewerCount;
  }
}
