import { Client, Account, OAuthProvider } from "appwrite";

class AppwriteConfig {
    constructor(END_POINT, PROJECT_ID) {
        this.client = new Client().setEndpoint(END_POINT).setProject(PROJECT_ID);
        this.account = new Account(this.client);
    }

    async login() {
        try {
            const user = await this.account.get(); // Check if user is already logged in
            console.log("User already logged in:", user);
        } catch (error) {
            // User is not logged in, so initiate Google login
            const redirectURL = window.location.origin; // Automatically detect current domain
            this.account.createOAuth2Session(OAuthProvider.Google, redirectURL, `${redirectURL}/login`);
        }
    }

            console.log(currentSession);
            window.alert("You are already logged in");
            return true;
        }
    }
    
}

export default AppwriteConfig;