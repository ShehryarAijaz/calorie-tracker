import { Client, Account, ID } from appwrite;

export class AuthService {

    // This is a client object that is used to make requests to the Appwrite server.
    client = new Client();

    // This is an account object that is used to make requests to the Appwrite account service.
    account;

    // This is a constructor for the AuthService class.
    // It sets the endpoint and project for the client and creates a new Account object.
    // The client is used to make requests to the Appwrite server.
    // The account is used to make requests to the Appwrite account service.
    constructor() {
        this.client.setEndpoint(String(import.meta.env.VITE_APPWRITE_ENDPOINT))
        this.client.setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID))
        this.account = new Account(this.client)
    }

    // This is a function that is used to create a new account in the Appwrite Server. It takes an ID given by appwrite (unique), email, password, and name as parameters. It returns a promise if the account is created successfully. If the account is not created successfully, it will return null.
    async createAccount(ID, email, password, name) {
        try {
            return await this.account.create(ID.unique(), email, password, name)
        } catch (error) {
            console.log("Error creating account", error)
        }
        return null;
    }

    // This is a function that is used to login to the Appwrite Server. It takes an email and password as parameters. It returns a promise if the login is successful. If the login is not successful, it will return null.
    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Error logging in", error)
        }
        return null;
    }

    // This is a function that is used to logout from the Appwrite Server. It returns a promise if the logout is successful. If the logout is not successful, it will return null.
    async logout() {
        try {
            await this.account.deleteSession("current")
        } catch (error) {
            console.log("Error logging out", error)
        }
        return null;
    }

    // This is a function that is used to get the current user from the Appwrite Server. It returns a promise if the current user is retrieved successfully. If the current user is not retrieved successfully, it will return null.
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Error getting current user", error)
        }
        return null;
    }
}

// This is a singleton instance of the AuthService class. It is used to make requests to the Appwrite Server.
const authService = new AuthService();
export default authService;

// Whenever someone calls AuthService class, it will create a new connection to the Appwrite Server. The functions will be created in the class and can be called by appending the class name to the function name. For example, if we call AuthService.createAccount(), it will create a new account in the Appwrite Server. This comment is for me to understand the code better.

