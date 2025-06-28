import { Account,Client,Databases } from "react-native-appwrite";

export const client = new Client() //connect the authers
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE__ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE__PROJECT_ID!);

  export const account = new Account(client);

  export const databases = new Databases(client);//connect the database


  export const DATABASE_ID =process.env.EXPO_PUBLIC_DB_ID!;
  export const HABITS_COLLECTION_ID =process.env.EXPO_PUBLIC_HABITS_COLLECTION_ID!;
  export const COMPLETIONS_COLLECTION_ID =process.env.EXPO_PUBLIC_COMPLETIONS_COLLECTION_ID!;


  export interface RealtimeResponse{
    events:string[];
    payload:any;
  }
