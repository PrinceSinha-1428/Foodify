import { AppwriteDBId, AppwriteProjectId, AppwriteURLEndpoint, AppwriteUserCollectionId } from "./Environment.constants";

export const appwriteConfig = {
    endpoint: AppwriteURLEndpoint,
    projectId: AppwriteProjectId,
    databaseId: AppwriteDBId,
    platform: "com.pks.foodify",
    userCollectionId: AppwriteUserCollectionId

}