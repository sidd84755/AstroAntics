import React from 'react';
import { useState } from 'react';
import { Box, Text, Link } from 'native-base';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  // const handleRegister = async (formData) => {
  //   try {
  //     const { data } = await api.post('/auth/register', formData);
  //     register(data.token, data.user);
  //   } catch (error) {
  //     console.error('Registration failed:', error);
  //   }
  // };

  const handleRegister = async ({ email, password, username }) => {
    setLoading(true);
    const success = await register(email.trim().toLowerCase(), password, username);
    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
        animationEnabled: true, // Enable native animation
        animationTypeForReplace: 'push',
      });
    } else {
      alert('Registration failed');
    }
    setLoading(false);
  };

  return (
    <Box flex={1} p={8} bg="cosmicDark" justifyContent="center">
      <Text fontSize="2xl" color="starDust" mb={8} textAlign="center">
        Create Cosmic Account
      </Text>
      <AuthForm onSubmit={handleRegister} isLogin={false} loading={loading}/>
      <Text mt={4} color="starDust" textAlign="center">
        Already have an account?{' '}
        <Link onPress={() => navigation.navigate('Login')}>
          Login here
        </Link>
      </Text>
    </Box>
  );
};

export default RegisterScreen;