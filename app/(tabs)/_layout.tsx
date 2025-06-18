import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

  <Tabs screenOptions={{ tabBarStyle:{backgroundColor:"#f5f5f5",borderTopWidth:0,elevation:0,shadowOpacity:0} ,tabBarActiveTintColor:"#3a00f7",tabBarActiveBackgroundColor:"#b2d8f7",tabBarInactiveTintColor:"black",headerTitleAlign: 'center', headerStyle:{backgroundColor:"#f5f5f5"},headerShadowVisible:false}}>
    <Tabs.Screen 
      name="index"  options={{
      title:"Today's Habits", 
      tabBarIcon:({color,focused})=>{
        return focused?(
            <MaterialIcons name="calendar-today" size={24} color={color} />):(<AntDesign name="calendar" size={24} color="black" />); {/*this means if the icon is focused true it colr is blue and it icon should be FontAwesome5 icon other wise it color is black and icon is AntDesign */}
      
          },
      }}
    />
    <Tabs.Screen 
      name="streaks"  options={{
      title:"Streaks", 
      tabBarIcon:({color,focused})=>{
        return focused?(
            <FontAwesome name="line-chart" size={24} color={color} />):(<FontAwesome6 name="chart-line" size={24} color="black" />); {/*this means if the icon is focused true it colr is blue and it icon should be FontAwesome5 icon other wise it color is black and icon is AntDesign */}
      
          },
      }}
      />
    <Tabs.Screen 
      name="add_habit"  options={{
      title:"Add Habit", 
      tabBarIcon:({color,focused})=>{
        return focused?(
            <AntDesign name="pluscircle" size={24} color={color} />):(<AntDesign name="pluscircleo" size={24} color="black" />); {/*this means if the icon is focused true it colr is blue and it icon should be FontAwesome5 icon other wise it color is black and icon is AntDesign */}
      
          },
      }}
    />
  </Tabs>


  );
}
