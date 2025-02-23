import React from 'react';
import { Box, HStack, Text, Avatar } from 'native-base';
import { useTheme } from '../context/ThemeContext';

const CommentItem = ({ comment }) => {
  const theme = useTheme();
  return (
    <Box bg={theme.colors.cosmicPurple} p={3} borderRadius={8} my={1}>
      <HStack space={3} alignItems="center">
        <Avatar 
          source={{ uri: comment.author.avatar }} 
          size="sm"
          bg={theme.colors.nebulaPink}
        />
        <Box flex={1}>
          <Text color={theme.colors.starDust} fontSize="sm" bold>
            {comment.author.username}
          </Text>
          <Text color={theme.colors.starDust} fontSize="md">
            {comment.content}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default CommentItem;