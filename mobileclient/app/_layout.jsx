// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import LoginScreen from './screens/LoginScreen';
import AdminScreen from './screens/AdminScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cosmic Posts' }} />
        <Stack.Screen name="Post" component={PostScreen} options={{ title: 'Post Detail' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login / Signup' }} />
        <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'New Post' }} /> */}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
