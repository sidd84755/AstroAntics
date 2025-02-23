import React from 'react';
import { Box, Image, Text, Button, HStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const PostCard = ({ post, onLikePress, onCommentPress }) => (
  <Box bg="cosmicPurple" m={2} p={4} borderRadius={10}>
    <Image
      source={{ uri: post.featuredImage }}
      alt={post.title}
      h={200}
      borderRadius={10}
    />
    <Text fontSize="xl" color="starDust" mt={2}>
      {post.title}
    </Text>
    <HStack space={2} mt={2}>
      {post.tags.map((tag) => (
        <Text key={tag} color="nebulaPink" fontSize="sm">
          #{tag}
        </Text>
      ))}
    </HStack>
    <HStack justifyContent="space-between" mt={3}>
        <Button 
        onPress={() => onLikePress(post._id)}
        leftIcon={<MaterialIcons name="favorite" />}
      >
        {post.likes.length} Likes
      </Button>
      
      <Button 
        onPress={() => onCommentPress(post._id)}
        leftIcon={<MaterialIcons name="comment" />}
      >
        {post.comments.length} Comments
      </Button>
    </HStack>
  </Box>
);

export default PostCard;