// navigation/TabNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ContactScreen from '../screens/ContactScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const CustomTabBar = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#9370DB',
        tabBarInactiveTintColor: '#E6E6FA',
        tabBarStyle: {
          backgroundColor: '#2E0854',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Explore" 
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      {user?.role === 'admin' && (
        <Tab.Screen 
          name="Create" 
          component={CreatePostScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="add-circle" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
      )}
      <Tab.Screen 
        name="Contact" 
        component={ContactScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="contact-support" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomTabBar;