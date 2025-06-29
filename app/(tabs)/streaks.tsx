import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Habit, HabitCompletion } from '@/database.type';
import { useAuth } from '@/lib/auth-context';
import { COMPLETIONS_COLLECTION_ID, DATABASE_ID, databases, HABITS_COLLECTION_ID } from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';

const Streak = () => {

  const [habits,setHabits]=useState<Habit[]>([]);
  const [completedHabits,setCompletedHabits]=useState<HabitCompletion[]>([]);
  const {user} =useAuth();

  useEffect(()=>{
  
      if(user){
    
        fetchHabits();
        fetchCompletions();
      }
  
    },[user])


    const fetchHabits = async()=>{
        try{
          const response = await databases.listDocuments(
            DATABASE_ID,
            HABITS_COLLECTION_ID,
            [Query.equal("user_id",user?.$id?? "")]//this means when database user id not euqal in the database user id pass the empty string
          );
          console.log(response.documents);
          setHabits(response.documents as Habit[]);
        }catch(error){
          console.log(error);
          
        }
      };
    
      const fetchCompletions = async()=>{
        try{
          const response = await databases.listDocuments(
            DATABASE_ID,
            COMPLETIONS_COLLECTION_ID,
            [Query.equal("user_id",user?.$id?? "")]
          );
          const completions =response.documents as HabitCompletion[];
          setCompletedHabits(completions);
        }catch(error){
          console.log(error);
          
        }
      };

    interface StreakData{
      streak:number;
      bestStreak:number;
      total :number;
    }
  
  const getStreakData =(habitId:string):StreakData=>{
    const habitCompletions =completedHabits?.filter(
      (c)=>c.habit_id===habitId
    ).sort((a,b)=> new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime()); //this is the sorting the habits using time


    if(habitCompletions?.length===0){
      return{ streak : 0, bestStreak : 0, total :0};
    }

    //build streak data
    let streak = 0;
    let bestStreak= 0;
    let total = habitCompletions.length;

    let lastDate : Date | null =null;
    let currentStreak =0;

    habitCompletions?.forEach((c)=>{
      const date = new Date(c.completed_at)
      if(lastDate){
        const diff =(date.getTime()-lastDate.getTime()) / (100*60*60*24);

        if(diff<=1.5){
          currentStreak+=1;
        }
        else{
          currentStreak=1;
        }
      }
      else{
        if(currentStreak > bestStreak){
          bestStreak = currentStreak;
        }
        streak =currentStreak
        lastDate =date
      }
    })

    return{ streak , bestStreak , total };
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <View>
      <Text>Habit Streaks</Text>
    </View>
    </SafeAreaView>
  )
}

export default Streak