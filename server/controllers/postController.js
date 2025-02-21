import Post from '../models/Post.js';

const createPost = async (req, res) => {
  try {
    const { title, content, tags, featuredImage } = req.body;
    
    const post = new Post({
      title,
      content,
      tags,
      featuredImage,
      author: req.user._id
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username avatar')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username avatar' }
      })
      .sort('-createdAt');

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username avatar')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username avatar' }
      });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPost, getAllPosts, getPostById };