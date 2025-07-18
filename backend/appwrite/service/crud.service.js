import { Client, Account, ID, Databases, Storage, Query } from 'appwrite';

export class CrudService {
    client = new Client();
    account;
    databases;
    storage;

    constructor() {
        this.client.setEndpoint(String(import.meta.env.VITE_APPWRITE_ENDPOINT))
        this.client.setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID))

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    // This is a function that is used to add a food for a user. It takes a userId and an object with the food details as parameters and returns a promise if the food is added successfully. If the food is not added successfully, it will return null.
    async addFood({ userId, name, calories, protein, carbs, fat, servingSize, isCustom }) {
        try {
            return await this.databases.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                ID.unique(),
                {
                    userId,
                    name,
                    calories,
                    protein,
                    carbs,
                    fat,
                    servingSize,
                    isCustom
                }
            )
        } catch (error) {
            console.log("Error adding food", error)
        }
        return null;
    }

    // This is a function that is used to update a food for a user. It takes a userId and an object with the food details as parameters and returns a promise if the food is updated successfully. If the food is not updated successfully, it will return null.
    async updateFood(userId, { name, calories, protein, carbs, fat, servingSize, isCustom }) {
        try {
            return await this.databases.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                userId,
                {
                    name,
                    calories,
                    protein,
                    carbs,
                    fat,
                    servingSize,
                    isCustom
                }
            )
        } catch (error) {
            console.log("Error updating food", error)
        }
        return null;
    }

    // This is a function that is used to delete a food for a user. It takes a userId as a parameter and returns a promise if the food is deleted successfully. If the food is not deleted successfully, it will return null.
    async deleteFood(userId) {
        try {
            await this.databases.deleteDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                userId
            )
            return true;
        } catch (error) {
            console.log("Error deleting food", error)
        }
        return false;
    }

    // This is a function that is used to get all the foods for a user. It takes a userId as a parameter and returns a promise if the foods are retrieved successfully. If the foods are not retrieved successfully, it will return null.
    async getFoods(userId) {
        try {
            return await this.databases.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                [Query.equal("userId", userId)]
            )
        } catch (error) {
            console.log("Error getting foods", error)
        }
        return null;
    }
}

const crudService = new CrudService();

export default crudService;