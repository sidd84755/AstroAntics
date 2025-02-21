import Post from '../models/Post.js';

const toggleLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    
    // Check if user already liked
    const isLiked = post.likes.includes(userId);
    
    const update = isLiked 
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      update,
      { new: true }
    ).populate('likes', 'username avatar');

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { toggleLike };