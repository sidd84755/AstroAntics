// screens/ProfileScreen.js
import { Box, Button, Text } from 'native-base';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  return (
    <Box flex={1} bg="cosmicDark" p={4}>
      {user ? (
        <>
          <Text color="starDust" fontSize="2xl">Welcome, {user.username}</Text>
          <Text color="starDust" mt={4}>Email: {user.email}</Text>
          <Button 
            mt={8} 
            colorScheme="purple"
            onPress={() => logout()}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Text color="starDust" fontSize="2xl">Please login to view profile</Text>
          <Button 
            mt={8} 
            colorScheme="purple"
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Button>
        </>
      )}
    </Box>
  );
};

export default ProfileScreen;