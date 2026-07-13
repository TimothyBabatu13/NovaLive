import { Router } from 'express';
import {
  createStream,
  getStreams,
  getStreamById,
  updateStream,
  deleteStream,
  getUserStreams,
  getStreamByKey,
} from '../controllers/stream.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createStream);
router.get('/', getStreams);
router.get('/user/:userId', getUserStreams);
router.get('/key/:streamKey', getStreamByKey);
router.get('/:id', getStreamById);
router.put('/:id', authMiddleware, updateStream);
router.delete('/:id', authMiddleware, deleteStream);

export default router;
