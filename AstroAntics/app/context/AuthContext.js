import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const userData = JSON.parse(await AsyncStorage.getItem('user'));
        setUser(userData);
      }
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  // const login = async (token, userData) => {
  //   await AsyncStorage.setItem('token', token);
  //   await AsyncStorage.setItem('user', JSON.stringify(userData));
  //   api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   setUser(userData);
  //   // Redirect to previous screen if available
  //   navigation.navigate(navigation.getState()?.routes[0]?.name || 'MainTabs');
  // };

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      return true; // Return success status
    } catch (error) {
      console.error('Login error:', error);
      return false; // Return failure status
    }
  };

  const register = async (token, userData) => {
    // Similar to login
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);