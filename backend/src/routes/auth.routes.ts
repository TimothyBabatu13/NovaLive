import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

router.all('/register', (req, res) => {
  res.status(405).json({ success: false, error: 'Method Not Allowed' });
});

router.all('/login', (req, res) => {
  res.status(405).json({ success: false, error: 'Method Not Allowed' });
});

export default router;
