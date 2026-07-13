import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateStreamKey } from '../utils/stream-key';

const prisma = new PrismaClient();

export const createStream = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  const { title, description, gameId } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Stream title is required',
    });
  }

  try {
    const streamKey = generateStreamKey();

    const stream = await prisma.stream.create({
      data: {
        title,
        description,
        gameId,
        streamKey,
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

    res.status(201).json({
      success: true,
      message: 'Stream created successfully',
      data: stream,
    });
  } catch (error) {
    console.error('Create stream error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating stream',
    });
  }
};

export const getStreams = async (req: Request, res: Response) => {
  try {
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

    res.json({
      success: true,
      data: streams,
    });
  } catch (error) {
    console.error('Get streams error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching streams',
    });
  }
};

export const getStreamById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
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

    if (!stream) {
      return res.status(404).json({
        success: false,
        message: 'Stream not found',
      });
    }

    res.json({
      success: true,
      data: stream,
    });
  } catch (error) {
    console.error('Get stream error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching stream',
    });
  }
};

export const updateStream = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  const { title, description, gameId } = req.body;

  try {
    const stream = await prisma.stream.findUnique({
      where: { id },
    });

    if (!stream) {
      return res.status(404).json({
        success: false,
        message: 'Stream not found',
      });
    }

    if (stream.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own streams',
      });
    }

    const updatedStream = await prisma.stream.update({
      where: { id },
      data: {
        title,
        description,
        gameId,
      },
    });

    res.json({
      success: true,
      message: 'Stream updated successfully',
      data: updatedStream,
    });
  } catch (error) {
    console.error('Update stream error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating stream',
    });
  }
};

export const deleteStream = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  try {
    const stream = await prisma.stream.findUnique({
      where: { id },
    });

    if (!stream) {
      return res.status(404).json({
        success: false,
        message: 'Stream not found',
      });
    }

    if (stream.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own streams',
      });
    }

    await prisma.stream.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Stream deleted successfully',
    });
  } catch (error) {
    console.error('Delete stream error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting stream',
    });
  }
};

export const getUserStreams = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const streams = await prisma.stream.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: streams,
    });
  } catch (error) {
    console.error('Get user streams error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching user streams',
    });
  }
};

export const getStreamByKey = async (req: Request, res: Response) => {
  const { streamKey } = req.params;

  try {
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

    if (!stream) {
      return res.status(404).json({
        success: false,
        message: 'Stream not found',
      });
    }

    res.json({
      success: true,
      data: stream,
    });
  } catch (error) {
    console.error('Get stream by key error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching stream',
    });
  }
};
