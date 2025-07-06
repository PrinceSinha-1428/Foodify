import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";
import { AppwriteDBId, AppwriteProjectId, AppwriteURLEndpoint, AppwriteUserCollectionId } from "./Environment.constants";
import { CreateUserPrams, SignInParams } from "@/type";

export const appwriteConfig = {
    endpoint: AppwriteURLEndpoint!,
    projectId: AppwriteProjectId!,
    databaseId: AppwriteDBId!,
    platform: "com.pks.foodify",
    userCollectionId: AppwriteUserCollectionId!

}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account  = new Account(client); 
export const databases = new Databases(client); 
export const avatar = new Avatars(client);

export const createUser = async ({email,name,password}:CreateUserPrams) => {
    try {
        const newAccount = await account.create(ID.unique(),email,password,name);
        if(!newAccount){
            throw new Error("Failed to create an account")
        }
        await signIn({email,password});
        const avatarUrl = avatar.getInitialsURL(name);
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email,name, avatar: avatarUrl,accountId: newAccount.$id }
        )
    } catch (error) {
        throw new Error(error as string)
    }
}

export const signIn = async ({email,password}:SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email,password)
    } catch (error) {
        throw new Error(error as string)
    }
}

export const getCurrentUser = async() => {
  try {
    const currentAccount = await account.get();
    if(!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountIs',currentAccount.$id)]
    )
    if(!currentUser) throw Error;
    return currentUser.documents[0]
  } catch (error) {
    throw new Error(error as string)
  }
}
