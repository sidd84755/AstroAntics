import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function AdminScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    // Add your authentication token in headers if necessary
    axios.post('http://YOUR_BACKEND_URL/api/posts', { title, content }, {
      headers: { Authorization: `Bearer YOUR_ADMIN_TOKEN` }
    })
    .then(response => {
      Alert.alert('Post created!');
      navigation.navigate('Home');
    })
    .catch(error => {
      Alert.alert('Error creating post', error.response.data.message);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Post Title" 
        value={title} 
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput 
        placeholder="Content" 
        value={content} 
        onChangeText={setContent}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { backgroundColor: '#fff', marginBottom: 15, padding: 10, borderRadius: 5 },
});
