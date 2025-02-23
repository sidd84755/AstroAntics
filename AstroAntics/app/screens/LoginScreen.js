import React from 'react';
import { useState } from 'react';
import { Box, Text, Link } from 'native-base';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const navigation = useNavigation(); // Correct hook for React Navigation
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    const success = await login(email.trim().toLowerCase(), password);
    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
        animationEnabled: true, // Enable native animation
        animationTypeForReplace: 'push',
      });
    } else {
      alert('Login failed');
    }
    setLoading(false);
  };

  return (
    <LinearGradient
      colors={['#0A001A', '#2E0854']}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <Box flex={1} p={8} justifyContent="center">
        <Text fontSize="3xl" color="starDust" mb={8} textAlign="center" bold>
          🌌 Cosmic Journey
        </Text>
        <AuthForm onSubmit={handleLogin} isLogin={true} loading={loading}/>
        <Text mt={4} color="starDust" textAlign="center">
          New to the cosmos?{' '}
          <Link _text={{ color: 'nebulaPink' }} onPress={() => navigation.navigate('Register')}>
            Create account
          </Link>
        </Text>
      </Box>
    </LinearGradient>
  );
};

export default LoginScreen;