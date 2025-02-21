import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;
    
    const comment = await Comment.create({
      content,
      author: req.user._id,
      post: postId
    });

    // Add comment to post's comments array
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id }
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username avatar');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addComment };