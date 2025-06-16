import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

//import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginLayout() {
  //const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // if (!loaded) {
  //   return null;
  // }

  return (
  
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Index" options={{ headerShown: false }} />
        <Stack.Screen name="Register" />
        <Stack.Screen name="RegisterStep02" />
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
    // <StatusBar style="auto" /> 
  
  );
}
