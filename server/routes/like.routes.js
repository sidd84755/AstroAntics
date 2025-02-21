import express from 'express';
import { toggleLike } from '../controllers/likeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/:postId', authMiddleware, toggleLike);

export default router;