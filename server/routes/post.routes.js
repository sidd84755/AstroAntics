import express from 'express';
import { 
  createPost, 
  getAllPosts, 
  getPostById 
} from '../controllers/postController.js';
import { authMiddleware, adminCheck } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected admin routes
router.post('/', authMiddleware, adminCheck, createPost);

export default router;