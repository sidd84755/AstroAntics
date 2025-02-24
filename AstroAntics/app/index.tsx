import { useFonts, SpaceMono_400Regular, SpaceMono_700Bold } from '@expo-google-fonts/space-mono';
import { NativeBaseProvider, Spinner, Box } from 'native-base';
import { cosmicTheme } from "./context/ThemeContext";
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';

export default function Index() {
  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': SpaceMono_400Regular,
    'SpaceMono-Bold': SpaceMono_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <NativeBaseProvider theme={cosmicTheme}>
        <Box flex={1} justifyContent="center" alignItems="center" bg="cosmicDark">
          <Spinner size="lg" color="nebulaPink" />
        </Box>
      </NativeBaseProvider>
    );
  }
  return (
    <NativeBaseProvider theme={cosmicTheme}>
    <AuthProvider>
      <AppNavigator />
     </AuthProvider>
   </NativeBaseProvider>
  );
}
