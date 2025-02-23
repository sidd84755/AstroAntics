import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // This hides the default Expo header
        contentStyle: { backgroundColor: '#0A001A' }, // Cosmic dark background
      }}
    />
  );
}