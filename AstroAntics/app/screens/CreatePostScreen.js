import React, { useState } from 'react';
import { Box, Input, Button, TextArea, Select, Image } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import CosmicButton from '../components/CosmicButton';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // Initialize tags as an array.
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const { user } = useAuth();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare payload with title, content, and tags (an array)
      const payload = {
        title,
        content,
        tags,
      };

      // If an image is selected, include it (note: local URIs may need to be uploaded elsewhere)
      if (image) {
        payload.featuredImage = image;
      }

      await api.post('/posts', payload);
      navigation.goBack();
    } catch (error) {
      console.error('Post creation failed:', error.response?.data || error.message);
    }
  };

  return (
    <Box flex={1} p={4} bg="cosmicDark" justifyContent="center" alignItems="center">
      <Input
        placeholder="Post Title"
        value={title}
        onChangeText={setTitle}
        color="starDust"
        mb={4}
      />

      <TextArea
        placeholder="Write your cosmic thoughts..."
        value={content}
        onChangeText={setContent}
        color="starDust"
        h={200}
        mb={4}
      />

      <Select
        // Remove the multiple prop and any selectedValue prop.
        minWidth="200"
        accessibilityLabel="Choose Tag to Add"
        placeholder="Choose Tag to Add"
        _selectedItem={{ bg: 'teal.600' }}
        mt={1}
        onValueChange={itemValue => {
          if (itemValue && !tags.includes(itemValue)) {
            setTags([...tags, itemValue]);
          }
        }}
      >
        <Select.Item label="Nebula" value="nebula" />
        <Select.Item label="Galaxy" value="galaxy" />
        <Select.Item label="Stars" value="stars" />
        <Select.Item label="Blackhole" value="blackhole" />
      </Select>

      {/* Display the selected tags */}
      {tags.length > 0 && (
        <Box mt={2}>
          {tags.map((tag, index) => (
            <Button
              key={index}
              variant="outline"
              size="xs"
              mb={1}
              onPress={() => {
                // Remove the tag when pressed
                setTags(tags.filter(t => t !== tag));
              }}
            >
              {tag}
            </Button>
          ))}
        </Box>
      )}

      <Button onPress={pickImage} mt={4} mb={4}>
        Upload Featured Image
      </Button>

      {image && (
        <Image
          source={{ uri: image }}
          alt="Post Image"
          size="2xl"
          mt={4}
          borderRadius={10}
        />
      )}

      <CosmicButton onPress={handleSubmit}>
        Publish Post
      </CosmicButton>
    </Box>
  );
};

export default CreatePostScreen;
