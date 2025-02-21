// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Replace YOUR_BACKEND_URL with your actual backend URL.
    axios.post('http://YOUR_BACKEND_URL/api/users/login', { username, password })
      .then(response => {
        // Save the token securely (e.g., AsyncStorage or Context API) for later requests.
        Alert.alert('Logged in successfully!');
        // Navigate to Home or update authentication state accordingly.
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Login failed', error.response?.data?.message || error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {/* Optionally, add a sign-up button or link if you implement user registration */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { backgroundColor: '#fff', marginBottom: 15, padding: 10, borderRadius: 5 },
});
