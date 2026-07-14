import { Router } from 'express';
import { getMessages } from '../controllers/chat.controller';

const router = Router();

router.get('/:streamId/messages', getMessages);

export default router;
