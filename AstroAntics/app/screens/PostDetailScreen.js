import React, { useState, useEffect } from 'react';
import { Box, Text, Input, Button, VStack, Spinner } from 'native-base';
import api from '../services/api';
import CommentItem from '../components/CommentItem';

const PostDetailScreen = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await api.get(`/posts/${postId}`);
      setPost(data);
    };
    fetchPost();
  }, [postId]);

  const handleComment = async () => {
    await api.post(`/comments/${postId}`, { content: comment });
    setComment('');
    // Refresh comments
  };

  return (
    <Box flex={1} bg="cosmicDark" p={4}>
      {post ? (
        <>
          <Text fontSize="2xl" color="starDust">{post.title}</Text>
          <Text color="starDust" mt={4}>{post.content}</Text>
          
          <VStack mt={8} space={4}>
            <Text fontSize="lg" color="nebulaPink">Comments</Text>
            {user && (
              <Input
                value={comment}
                onChangeText={setComment}
                placeholder="Add a comment..."
                color="starDust"
                onSubmitEditing={handleComment}
              />
            )}
            {post.comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
          </VStack>
        </>
      ) : (
        <Spinner color="nebulaPink" size="lg" />
      )}
    </Box>
  );
};

export default PostDetailScreen;