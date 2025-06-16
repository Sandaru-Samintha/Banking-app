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
        <Stack.Screen name="Index" options={{ headerShown: false }} />
        <Stack.Screen name="Register" />
        <Stack.Screen name="RegisterStep02" />
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
    // <StatusBar style="auto" /> 
  
  );
}
