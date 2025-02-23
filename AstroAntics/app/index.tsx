import { NativeBaseProvider } from 'native-base';
import { cosmicTheme } from "./context/ThemeContext";
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';

export default function Index() {
  return (
    <NativeBaseProvider theme={cosmicTheme}>
    <AuthProvider>
      <AppNavigator />
     </AuthProvider>
   </NativeBaseProvider>
  );
}
