import React from 'react';
import { Box, Text, Link } from 'native-base';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();

  const handleRegister = async (formData) => {
    try {
      const { data } = await api.post('/auth/register', formData);
      register(data.token, data.user);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Box flex={1} p={8} bg="cosmicDark" justifyContent="center">
      <Text fontSize="2xl" color="starDust" mb={8} textAlign="center">
        Create Cosmic Account
      </Text>
      <AuthForm onSubmit={handleRegister} isLogin={false} />
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