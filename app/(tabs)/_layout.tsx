import { Tabs } from "expo-router";
import { Text } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";



export default function TabsLayout() {

  const { user, isLoadingUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoadingUser) {
      router.replace("/(auth)");
    }
  }, [user, isLoadingUser]);


  return (
  // <>
  //   {/* <Text>Sandaru samintha</Text> */}
  
  //   <Tabs />
  //   {/* //<Text>Sandaru samintha</Text> */}

  // </>


  //***********we define the screen using this methode******
  /* this means  the name is index page screen its tilte is Home (bottom of the page display  "Home")*/

  <Tabs screenOptions={{tabBarActiveTintColor:"#3a00f7",tabBarActiveBackgroundColor:"#b2d8f7"}}>
    <Tabs.Screen 
      name="index"  options={{
      title:"Home", 
      tabBarIcon:({color,focused})=>{
        return focused?(
            <FontAwesome5 name="home" size={24} color={color} />):(<AntDesign name="home" size={24} color="black" />); {/*this means if the icon is focused true it colr is blue and it icon should be FontAwesome5 icon other wise it color is black and icon is AntDesign */}
      
          },
      }}
      />


    <Tabs.Screen name="login" options={{title:"Login"}}/> {/**this page is not exist so we get that screen, we should navigate  the index.tsx  and link the login page */}
  </Tabs>


  );
}
