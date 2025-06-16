import { KeyboardAvoidingView,Platform,StyleSheet,TouchableOpacity,View } from 'react-native'
import React, { useState } from 'react'
import {Button, Text,TextInput,useTheme} from "react-native-paper"
import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/lib/auth-context';

const   Register=()=> {

  const router = useRouter();

  const [email,setEmail]=useState<string>("") //this means first start string is null and create the state
  const [password,setPassword]=useState<string>("")
  const[error,setError]=useState<string|null>("")
  const theme=useTheme()

  const {signUp}=useAuth();

  const handleAuth=async()=>{
    if(!(email||password)){
      setError("Please fill in all fields.");
      return;
    }
    if(password.length<6){
      setError("Passwords must be at least 6 characters long.");
      return;
    }
    setError(null);
    //there is no error in the sign in
    const error =await signUp(email,password);
    if(error){
      setError(error)
      return 
    }
    router.replace('/(tabs)')
    
  };

  {/*this is the basic normal view,this cas can keyboard ovelapping stop using keyboardAvoidingView  */}
  return (
    <SafeAreaView style={{flex:1}}>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==="ios" ? "padding":"height"}> 
      <View style={styles.contain}>
        <Text style={styles.topText}>Create Account</Text>

        <TextInput  style={styles.TextInput} label="Email" autoCapitalize='none' placeholder='examle@gmail.com' keyboardType='email-address' mode='outlined' onChangeText={setEmail}/>

        <TextInput style={styles.TextInput} label="Password" secureTextEntry autoCapitalize='none'   mode='outlined' onChangeText={setPassword}/>

        {error && (
          <Text style={{color:theme.colors.error}}>{error}</Text>
        )}

        <TouchableOpacity  onPress={handleAuth}>
          <Button mode='contained' style={styles.button}>Sign up</Button>
        </TouchableOpacity>
      
        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:8}}>
          <Text>Already have an account? </Text>
            <Link href='/'><Text style={{color:"green",fontSize:15}} >Sign in</Text></Link>
        </View>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
export default Register;


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',   // vertical centering
    alignItems: 'center',       // horizontal centering
    padding: 16,
  },
  contain:{
    alignItems: 'center', 
  },
  topText:{
    marginTop:8,
    fontSize:30,
    fontWeight:700,
    marginBottom:30,
  },
  TextInput:{
    width:380,
    marginBottom:20
  },
  button:{
    marginTop:8 ,
    backgroundColor:"blue",
    width:100
  }

});