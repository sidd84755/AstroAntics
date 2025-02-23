// navigation/AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PostDetailScreen from '../screens/PostDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#0A001A' }
    }}
  >
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{ 
        presentation: 'modal',
        headerShown: true,
        headerStyle: { backgroundColor: '#2E0854' },
        headerTintColor: '#E6E6FA'
      }}
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen} 
      options={{ 
        presentation: 'modal',
        headerShown: true,
        headerStyle: { backgroundColor: '#2E0854' },
        headerTintColor: '#E6E6FA'
      }}
    />
    <Stack.Screen 
      name="PostDetail" 
      component={PostDetailScreen} 
      options={{ 
        headerShown: true,
        headerStyle: { backgroundColor: '#2E0854' },
        headerTintColor: '#E6E6FA',
        title: 'Post Details'
      }}
    />
  </Stack.Navigator>
);

export default AppNavigator;