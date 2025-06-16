import { AuthProvider } from "@/lib/auth-context";
import { Stack} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
//import { View,Text } from "react-native";



//that function is create the if we fistly use app we should open authentiction so the first page display this function
// function RouteGuard({children}:{children:React.ReactNode }) {
//   const router=useRouter();
//   const isAuth=false;

//   useEffect(()=>{
//     if(!isAuth){
//       router.replace("/auth");
//     }
//   });

//   return <>{children}</>;
// }






export default function RootLayout() {
  return (
  // <>
  //   {/* <Text>Sandaru samintha</Text> */}
  
  //   <Stack />
  //   {/* //<Text>Sandaru samintha</Text> */}

  // </>


  //***********we define the screen using this methode******
    //<RouteGuard>
    <AuthProvider>
    <Stack>
      <Stack.Screen name="(auth)"  options={{headerShown:false }}/>
      <Stack.Screen name="(tabs)"  options={{headerShown:false }}/> {/* this means  the name is index page screen its tilte is Home screen in the heder we dont show this header so we use headershow false (top of the page display "Home")*/}
      
    </Stack>
    </AuthProvider>
    //</RouteGuard>



  );
}
