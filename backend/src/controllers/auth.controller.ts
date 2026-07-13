import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface RegisterBody {
  email: string;
  username: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response) => {
  const { email, username, password }: RegisterBody = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email, username, and password are required',
    });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: LoginBody = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login',
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        bio: true,
        isStreaming: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            streams: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: {
        ...user,
        followersCount: user._count.followers,
        followingCount: user._count.following,
        streamsCount: user._count.streams,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching profile',
    });
  }
};
