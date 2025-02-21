import express from 'express';
import { addComment } from '../controllers/commentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/:postId', authMiddleware, addComment);

export default router;