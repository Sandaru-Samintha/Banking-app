import { createContext, useContext } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";




type AuthContextType={
  //user:Models.User<Models.Preferences>|null;
  signUp:(email:string,password:string)=>Promise<string|null>; //in this pass the error message of string in the sign up without error pass the null
  signIn:(email:string,password:string)=>Promise<string|null>;//in this pass the error message of string in the sign in without error pass the null
};

const AuthContext =createContext<AuthContextType |undefined>(undefined);

export function AuthProvider({children}:{children:React.ReactNode}){
  const signUp=async(email:string,password:string)=>{
    try{
      await account.create(ID.unique(),email,password);
      await signIn(email,password);
      return null
    }
    catch(error){
      if(error instanceof Error){
        return error.message
      }
      return "An error message occured during sign up"
    }
    
  }

  const signIn=async(email:string,password:string)=>{
    try{
      await account.createEmailPasswordSession(email,password);
      return null
    }
    catch(error){
      if(error instanceof Error){
        return error.message
      }
      return "An error message occured during sign in"
    }
  }



  return(
    <AuthContext.Provider value={{signIn,signUp}}>{children}</AuthContext.Provider>
  );

}


export function useAuth() {
  const context =useContext(AuthContext)
  if(context===undefined){
    throw new Error("useAuth must be inside pf the AuthProvider")
  }
  return context;
}