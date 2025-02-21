import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://YOUR_BACKEND_URL/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <ImageBackground 
      source={require('../assets/s1.jpg')} 
      style={styles.background}>
      <FlatList 
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Post', { post: item })}>
            <View style={styles.postCard}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  postCard: { 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    margin: 10, padding: 15, borderRadius: 8 
  },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
