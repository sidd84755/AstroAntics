import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    featuredImage: {
      type: String,
      default: 'https://example.com/cosmic-default.jpg'
    },
    tags: [{
      type: String,
      enum: ['nebula', 'galaxy', 'stars', 'blackhole', 'cosmology']
    }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  }, { timestamps: true });

  export default mongoose.model('Post', postSchema);