import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, SegmentedButtons, TextInput, useTheme } from 'react-native-paper'
import { useAuth } from '@/lib/auth-context';
import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from '@/lib/appwrite';
import { ID } from 'react-native-appwrite';
import { useRouter } from 'expo-router';


const FREQUENCIES =["Daily","Weekly","Monthly"];
type Frequency=(typeof FREQUENCIES)[number];


const AddHabitScreen = () => {
  const [tittle,setTittle]=useState<string>("");
  const [description,setDescription]=useState<string>("");
  const [frequency,setFrequency]=useState<Frequency>("Daily");
  const {user} =useAuth();
  const router =useRouter();
  const [error,setError]=useState<string>("");
  const theme = useTheme();


  const handleSubmit = async()=>{
    if(!user){
      return;
    }
    try{
      await databases.createDocument(
      DATABASE_ID,
      HABITS_COLLECTION_ID,
      ID.unique(),
      {
        user_id:user.$id,
        tittle,
        description,
        frequency,
        streak_count:0,
        last_completed:new Date().toISOString(),
        created_at:new Date().toISOString(),


      }
      );
      router.back()// this means when submited go back to the home page
    }
    catch(error){
      if(error instanceof Error){
        setError(error.message)
        return;
      }
      setError ("There was an error creating the habit");
    }
    
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <TextInput label="Tittle"  mode="outlined" onChangeText={setTittle} style={styles.input}/>
        <TextInput label="Description"  mode="outlined"  onChangeText={setDescription}  style={styles.input}/>
        <View style={styles.frequencyContainer}>
          <SegmentedButtons  value={frequency} onValueChange={(value)=>setFrequency(value as Frequency)}
            buttons={FREQUENCIES.map((freq)=>({
              value:freq,
              label:freq,
            }))}
          
          style={styles.segmentButton}/>
        </View>
        <TouchableOpacity style={{alignItems:"center"}}>
        <Button mode="contained"  style={styles.button} onPress={handleSubmit} disabled={!(tittle||description)}>Add Habit</Button>
        </TouchableOpacity>
        {error && (
          <Text style={{color:theme.colors.error}}>{error}</Text>
        )}
      </View>
    </SafeAreaView>
  )
}

export default AddHabitScreen



const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:16,
    backgroundColor:"#f5f5f5",
    justifyContent:"center"
  },
  input:{
    marginBottom:16
  },
  frequencyContainer:{
    marginBottom:24
  },
  segmentButton:{
    marginBlock:8,
  },
  button:{
    backgroundColor:"blue",
    borderRadius:8,
  }


})