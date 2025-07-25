import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";
import { AppwriteBucketId, AppwriteCategoriesCollectionId, AppwriteCustomizationCollectionId, AppwriteDBId, AppwriteMenuCollectionId, AppwriteMenuCustomizationsId, AppwriteProjectId, AppwriteURLEndpoint, AppwriteUserCollectionId } from "./Environment.constants";
import { Category, CreateUserPrams, GetMenuParams, SignInParams } from "@/type";

export const appwriteConfig = {
    platform: "com.pks.foodify",
    endpoint: AppwriteURLEndpoint,
    projectId: AppwriteProjectId,
    databaseId: AppwriteDBId,
    bucketId: AppwriteBucketId,
    userCollectionId: AppwriteUserCollectionId,
    categoriesCollectionId: AppwriteCategoriesCollectionId,
    menuCollectionId: AppwriteMenuCollectionId,
    customizationsCollectionId: AppwriteCustomizationCollectionId,
    menuCustomizationsCollectionId: AppwriteMenuCustomizationsId

}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account  = new Account(client); 
export const databases = new Databases(client); 
export const avatar = new Avatars(client);
export const storage = new Storage(client)
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
        [Query.equal('accountId',currentAccount.$id)]
    )
    if(!currentUser) throw Error;
    return currentUser.documents[0]
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getMenu = async ({category,query}:GetMenuParams) => {
    try {
        const queries: string[] = [];
        if(category) queries.push(Query.equal('categories',category));
        if(query) queries.push(Query.search('name',query));
        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            AppwriteMenuCollectionId,
            queries
        );
        return menus.documents;
    } catch (error) {
        throw new Error(error as string)
    }
}

export const getCategory = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId
        );
        return categories.documents as Category[];
    } catch (error) {
        throw new Error(error as string)
    }
}