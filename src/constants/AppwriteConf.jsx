import { Client, Account, OAuthProvider } from "appwrite";

class AppwriteConfig {
    constructor(END_POINT, PROJECT_ID) {
        this.client = new Client().setEndpoint(END_POINT).setProject(PROJECT_ID);
        this.account = new Account(this.client);
    }

    async login() {
        const redirectURL = "http://localhost:5173" // window.location.origin; // Dynamically set the redirect URI
        const currentSession = await this.account.getSession('current');
        if (!currentSession) {
            return this.account.createOAuth2Session(OAuthProvider.Google, redirectURL, `${redirectURL}/login`);
        } else {
            console.log(currentSession);
            window.alert("You are already logged in");
            return true;
        }
    }
    
}

export default AppwriteConfig;