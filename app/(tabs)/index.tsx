import {  View,StyleSheet, ScrollView } from "react-native";
import { Button,Surface,Text } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { client, COMPLETIONS_COLLECTION_ID, DATABASE_ID, databases, HABITS_COLLECTION_ID, RealtimeResponse } from "@/lib/appwrite";
import { ID, Query } from "react-native-appwrite";
import {  useEffect, useRef, useState } from "react";
import { Habit, HabitCompletion } from "@/database.type";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Streak from "./streaks";

export default function Index() {
  const {signOut,user}=useAuth();

 //create the habits in types folder reusing because any type of habits use in this
  const [habits,setHabits]=useState<Habit[]>();
  const [completedHabits,setCompletedHabits]=useState<string[]>();

  const SwipeableRefs =useRef<{[key:string] : Swipeable |null}>({})

  useEffect(()=>{

    if(user){
  
      const habitsChannel=`databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`
      const habitsSubscription =client.subscribe(habitsChannel,
        (response:RealtimeResponse)=>{
          if(response.events.includes(
            "databases.*.collection.*.document.*.create"
          )
        ) {fetchHabits();
        }
        else if(response.events.includes(
            "databases.*.collection.*.document.*.update"
          )
        ) {
            fetchHabits();
        }
        else if(response.events.includes(
            "databases.*.collection.*.document.*.delete"
          )
        ) {
            fetchHabits();
        }
      }
      );


      const completionsChannel=`databases.${DATABASE_ID}.collections.${COMPLETIONS_COLLECTION_ID}.documents`
      const completionsSubscription =client.subscribe(completionsChannel,
        (response:RealtimeResponse)=>{
          if(response.events.includes(
            "databases.*.collection.*.document.*.create"
          )
        ){
          fetchTodayCompletions();
        }
      }
      );

      fetchHabits();
      fetchTodayCompletions();

      return ()=>{
        habitsSubscription();
        completionsSubscription();
      }
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

  const fetchTodayCompletions = async()=>{
    try{
      const today = new Date();
      today.setHours(0,0,0,0);
      const response = await databases.listDocuments(
        DATABASE_ID,
        COMPLETIONS_COLLECTION_ID,
        [Query.equal("user_id",user?.$id?? ""),
        Query.greaterThanEqual("completed_at",today.toISOString()),]
      );
      const completions =response.documents as HabitCompletion[];
      setCompletedHabits(completions.map((c)=>c.habit_id));
    }catch(error){
      console.log(error);
      
    }
  };

  const handleDeleteHabit =async(id:string)=>{
    try{
      await databases.deleteDocument(DATABASE_ID,HABITS_COLLECTION_ID,id)
    }catch(error){
      console.error(error);
    }
  }

  const handleCompleteHabit =async(id:string)=>{
    if(!user || completedHabits?.includes(id)) return;
    try{

      const currentDate =new Date().toISOString()
      await databases.createDocument(DATABASE_ID,COMPLETIONS_COLLECTION_ID,
        ID.unique(),{
        habit_id:id,
        user_id:user.$id,
        completed_at:new Date().toISOString(),
      }
    );

    const habit =habits?.find((h)=>h.$id===id);
    if(!habit) return;

    await databases.updateDocument(DATABASE_ID,HABITS_COLLECTION_ID,id ,{
      streak_count:habit.streak_count + 1,
      last_completed:currentDate,
    })

    }catch(error){
      console.error(error);
    }
  }

  const isHabitCompleted =(habitId:string)=>completedHabits?.includes(habitId);

  const renderRightActions =(habitId:string)=>(
    <View style={styles.swipeActionRight}>
      {isHabitCompleted(habitId) ?( 
        <Text style={{color:"#fff",fontSize:16,fontWeight: 'bold'}}>Completed !</Text>
      ):(
      <MaterialCommunityIcons name="check-circle-outline" size={32} color={"#fff"}/>
      )}
    </View>
    
  );

  const renderLeftActions =()=>(
    <View style={styles.swipeActionLeft}>
      <MaterialCommunityIcons name="trash-can-outline" size={32} color={"#fff"}/>
    </View>
  );
  
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.title}>Today's Habits</Text>
            <Button mode="text" onPress={signOut} icon="logout">Log out</Button>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} >
          {habits?.length === 0?(
            <View style={styles.emptyState} >
              {" "}
              <Text style={styles.emptyStateText}>No Habits yet.Add your first habit !</Text>
            </View>
          ):(
            habits?.map((habit,key) => (
            <Swipeable
              ref ={(ref)=>{
              SwipeableRefs.current[habit.$id]= ref;
            }}key={key}
            overshootLeft={false}
            overshootRight={false}
            renderLeftActions={renderLeftActions}
            renderRightActions={()=>renderRightActions(habit.$id)}
            onSwipeableOpen={(direction)=>{
              if(direction==="left"){
                handleDeleteHabit(habit.$id);
              }
              else if(direction==="right"){
                handleCompleteHabit(habit.$id);
              }

              SwipeableRefs.current[habit.$id]?.close();
            }}

            >
              <Surface style={[styles.card,isHabitCompleted(habit.$id)&& styles.cardCompleted]} elevation={0}>
                <View  style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{habit.tittle}</Text>
                  <Text style={styles.cardDescription}>{habit.description}</Text>

                  <View style={styles.cardFooter}>
                    <View style={styles.streakBadge}>
                      {" "}
                      <MaterialCommunityIcons 
                      name="fire"
                      size={24}
                      color="#ff9800" />
                      <Text style={styles.streakText}>{habit.streak_count} day streak</Text>
                    </View >
                    <View style={styles.frequencyBadge}>
                      <Text style={styles.frequencyText}>{habit.frequency}</Text>
                    </View>
                  </View>
                  
                </View>
              </Surface>
            </Swipeable>
          ))
          )}
          </ScrollView>
        </View>
        
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}


const styles =StyleSheet.create({
  container:{
    flex: 1,
    padding:16,
    backgroundColor:"#f5f5f5",
  },
  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:25,
    marginTop:-20,
  },
  title:{
    fontWeight:"bold"
  },
  card:{
    marginBottom:18,
    borderRadius:18,
    backgroundColor:"#c7dbf8",
    shadowColor:"#000",
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.08,
    shadowRadius:8,
    elevation:4
  },
  cardCompleted:{
    opacity:0.6,
  },
  cardContent:{
    padding:15
  },
  cardTitle:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:4,
    color:"#31314d"
  },
  cardDescription:{
    fontSize:15,
    marginBottom:16,
    color:"#6c6c80"
  },
  cardFooter:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  streakBadge:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff3e0",
    borderRadius:12,
    paddingHorizontal:10,
    paddingVertical:4
  },
  streakText:{
    marginLeft:6,
    color:"#ff9800",
    fontWeight:"bold",
    fontSize:14
  },
  frequencyBadge:{
    backgroundColor:"#f1f0fb",
    borderRadius:13,
    paddingHorizontal:12,
    paddingVertical:5
  },
  frequencyText:{
    color:"#7c4dff",
    fontWeight:"bold",
    fontSize:14,
  },
  emptyState:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",

  },
  emptyStateText:{
    color:"#666666"
  },
  swipeActionRight:{
    justifyContent:"center",
    alignItems:"flex-end",
    flex:1,
    backgroundColor:"#91db93",
    borderRadius:18,
    marginBottom:18,
    marginTop:2,
    paddingRight:16
  },
  swipeActionLeft:{
    justifyContent:"center",
    alignItems:"flex-start",
    flex:1,
    backgroundColor:"#e97a81",
    borderRadius:18,
    marginBottom:18,
    marginTop:2,
    paddingLeft:16
  }
  
})

