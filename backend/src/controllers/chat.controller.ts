import { Request, Response } from 'express';
import { ChatService } from '../services/chat.service';

export const getMessages = async (req: Request, res: Response) => {
  const { streamId } = req.params;
  const take = parseInt(req.query.take as string) || 50;

  try {
    const messages = await ChatService.getMessages(streamId, take);

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching messages',
    });
  }
};
