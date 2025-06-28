import { Stack } from 'expo-router';
import 'react-native-reanimated';







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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" />
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
    // <StatusBar style="auto" />
  
  );
}
