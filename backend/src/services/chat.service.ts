import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ChatService {
  static async sendMessage(data: {
    content: string;
    streamId: string;
    userId: string;
  }) {
    const message = await prisma.message.create({
      data: {
        content: data.content,
        streamId: data.streamId,
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

    return message;
  }

  static async getMessages(streamId: string, take: number = 50) {
    const messages = await prisma.message.findMany({
      where: { streamId },
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
      take,
    });

    return messages;
  }
}
