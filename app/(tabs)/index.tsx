import { Text, View,StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {signOut}=useAuth();
  
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.view}>
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <Button mode="text" onPress={signOut} icon="logout">Log out</Button>
      </View>
    </SafeAreaView>
  );
}


const styles =StyleSheet.create({
  view:{
    flex: 1,
    justifyContent:"center",
    alignItems: "center",
  },
  // naviButton:{
  //   width:100,
  //   height:20,
  //   backgroundColor:"#ff5100",
  //   borderRadius:12,
  //   textAlign:"center",
  //   alignItems: "center"
  // }


})

