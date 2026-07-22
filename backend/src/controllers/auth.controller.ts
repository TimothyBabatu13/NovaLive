
import type { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const user = await authService.registerUser(email, username, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.json({ message: 'Login successful', user, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
