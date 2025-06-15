import { Account,Client,Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE__ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE__PROJECT_ID!);

  export const account = new Account(client);