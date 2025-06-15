import { KeyboardAvoidingView,Platform,TouchableOpacity,View } from 'react-native'
import React from 'react'
import {Button, Text,TextInput} from "react-native-paper"
import { useRouter } from 'expo-router'

const   Index=()=> {

  const router = useRouter()

  {/*this is the basic normal view,this cas can keyboard ovelapping stop using keyboardAvoidingView  */}
  return (
    <KeyboardAvoidingView behavior={Platform.OS==="ios" ? "padding":"height"}> 
      <View>
      <Text>Create Account</Text>

      <TextInput label="Email" autoCapitalize='none' placeholder='examle@gmail.com' mode='outlined'/>

      <TextInput label="Password" autoCapitalize='none'   mode='outlined'/>

      <TouchableOpacity onPress={() => {
              router.replace('/(tabs)')
            }}>
          <Button mode='contained' style={{marginTop:8 ,backgroundColor:"blue",width:100,alignItems:"center"}}>Sign in</Button>
      </TouchableOpacity>
      
      <Button mode='text'>Allready have an account? Sign in</Button>
      </View>
    </KeyboardAvoidingView>
  )
}
export default Index;
