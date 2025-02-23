import React, { useState } from 'react';
import { Box, Text, Input, Button, TextArea, Select, Image } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import CosmicButton from '../components/CosmicButton';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('tags', JSON.stringify(tags));
      if (image) {
        formData.append('featuredImage', {
          uri: image,
          type: 'image/jpeg',
          name: 'post-image.jpg',
        });
      }

      await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigation.goBack();
    } catch (error) {
      console.error('Post creation failed:', error);
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
        selectedValue={tags}
        minWidth="200"
        accessibilityLabel="Choose Tags"
        placeholder="Choose Tags"
        _selectedItem={{ bg: 'teal.600' }}
        mt={1}
        onValueChange={itemValue => setTags(itemValue)}
        multiple
      >
        <Select.Item label="Nebula" value="nebula" />
        <Select.Item label="Galaxy" value="galaxy" />
        <Select.Item label="Stars" value="stars" />
        <Select.Item label="Blackhole" value="blackhole" />
      </Select>

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