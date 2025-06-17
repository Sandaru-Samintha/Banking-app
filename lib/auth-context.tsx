import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";




type AuthContextType={
  user:Models.User<Models.Preferences>|null;
  isLoadingUser:boolean;
  signUp:(email:string,password:string)=>Promise<string|null>; //in this pass the error message of string in the sign up without error pass the null
  signIn:(email:string,password:string)=>Promise<string|null>;//in this pass the error message of string in the sign in without error pass the null
  signOut:()=>Promise<void>;
};

//This sets up a context that will provide authentication functions (signUp and signIn) to the rest of the app.
const AuthContext =createContext<AuthContextType|undefined>(undefined);


//Wraps your app with authentication logic.    //Makes signIn and signUp functions available to any component inside
export function AuthProvider({children}:{children:React.ReactNode}){

  const [user,setUser]=useState<Models.User<Models.Preferences>|null>(null);

  const getUser =async()=>{
    try{
      const session =await account.get()
      setUser(session)
    }catch(error){
      setUser(null)
    }
  }

  const [isLoadingUser,setIsLoadingUser]=useState<boolean>(true);

  useEffect(()=> {
    getUser();
  },[]);

//Creates a new user using Appwrite.   // If successful, signs them in immediately.  // If there’s an error, returns the error message.
  const signUp=async(email:string,password:string)=>{
    try{
      await account.create(ID.unique(),email,password);
      await signIn(email,password);// <--- this signs them in immediately! when sign up and autmatically sign in
      return null
    }
    catch(error){
      if(error instanceof Error){
        return error.message
      }
      return "An error message occurred during sign up"
    }
    finally{
      setIsLoadingUser(false);
    }
    
  }

//Logs in an existing user.  //Returns null on success, or an error message on failure.
  const signIn=async(email:string,password:string)=>{
    try{
      await account.createEmailPasswordSession(email,password);
      const session=await account.get()
      setUser(session);
      return null;
    }
    catch(error){
      if(error instanceof Error){
        return error.message
      }
      return "An error message occurred during sign in"
    }
  }

  const signOut=async()=>{
    try{
      await account.deleteSession("current");
      setUser(null);
    }catch(error){
      console.log(error);
    }
    
  }


  return(
    <AuthContext.Provider value={{user,isLoadingUser,signIn,signUp,signOut}}>{children}</AuthContext.Provider>
  );

}

//useAuth() Hook   //This custom hook gives you access to signUp and signIn from anywhere in your app — as long as you're inside the AuthProvider.
export function useAuth() {
  const context =useContext(AuthContext)
  if(context===undefined){
    throw new Error("useAuth must be inside of the AuthProvider")
  }
  return context;
}