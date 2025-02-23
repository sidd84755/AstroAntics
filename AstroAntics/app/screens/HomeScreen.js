import React, { useEffect, useState } from 'react';
import { Box, FlatList, Spinner, Button } from 'native-base';
import { useAuth } from '../context/AuthContext'; // Add this import
import api from '../services/api';
import PostCard from '../components/PostCard';

const handleLikePress = async (postId) => {
  if (!user) {
    navigation.navigate('Login', { 
      message: 'Please login to like posts' 
    });
    return;
  }
  await api.post(`/likes/${postId}`);
  // Update post likes state
};

const handleCommentPress = (postId) => {
  if (!user) {
    navigation.navigate('Login', { 
      message: 'Please login to add comments' 
    });
    return;
  }
  navigation.navigate('PostDetail', { postId });
};

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Now properly imported

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts');
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Box flex={1} bg="cosmicDark">
      
      {loading ? (
        <Spinner color="nebulaPink" size="lg" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => 
          <PostCard 
          post={item}
          onLikePress={handleLikePress}
          onCommentPress={handleCommentPress}
        />}
        />
      )}
    </Box>
  );
};

export default HomeScreen;