// screens/PostScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';

export default function PostScreen({ route, navigation }) {
  const { post } = route.params;
  const [comment, setComment] = useState('');

  const handleLike = () => {
    // Replace YOUR_BACKEND_URL and YOUR_USER_TOKEN with actual values or token from your state/context
    axios.post(`http://YOUR_BACKEND_URL/api/posts/${post._id}/like`, {}, {
      headers: { Authorization: `Bearer YOUR_USER_TOKEN` }
    })
    .then(response => {
      Alert.alert('Liked the post!');
      // Optionally, update local state or refetch post details here.
    })
    .catch(error => {
      Alert.alert('Error liking the post', error.response?.data?.message || error.message);
    });
  };

  const handleComment = () => {
    if (comment.trim() === '') return;
    axios.post(`http://YOUR_BACKEND_URL/api/posts/${post._id}/comment`, { text: comment }, {
      headers: { Authorization: `Bearer YOUR_USER_TOKEN` }
    })
    .then(response => {
      Alert.alert('Comment added!');
      setComment('');
      // Optionally, update local state or refetch post details here.
    })
    .catch(error => {
      Alert.alert('Error adding comment', error.response?.data?.message || error.message);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
        <Text style={styles.likeText}>Like ({post.likes.length})</Text>
      </TouchableOpacity>
      <View style={styles.commentSection}>
        <Text style={styles.sectionTitle}>Comments</Text>
        {post.comments.map((c, index) => (
          <View key={index} style={styles.comment}>
            <Text style={styles.commentText}>{c.text}</Text>
          </View>
        ))}
        <TextInput 
          style={styles.input} 
          placeholder="Add a comment" 
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleComment}>
          <Text style={styles.commentButtonText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  content: { fontSize: 16, marginBottom: 20 },
  likeButton: { backgroundColor: '#0f3460', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  likeText: { color: '#fff', fontSize: 16 },
  commentSection: { borderTopWidth: 1, borderColor: '#ccc', paddingTop: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  comment: { marginBottom: 10 },
  commentText: { fontSize: 16 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10 },
  commentButton: { backgroundColor: '#1a1a2e', padding: 10, borderRadius: 5, alignItems: 'center' },
  commentButtonText: { color: '#fff' },
});
