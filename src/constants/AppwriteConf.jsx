import { Client, Account, OAuthProvider, ID } from "appwrite";

class AppwriteConfig {
    constructor(END_POINT, PROJECT_ID) {
        this.client = new Client().setEndpoint(END_POINT).setProject(PROJECT_ID);
        this.account = new Account(this.client);
    }

    async register(email, password, name) {
        try {
            // Check if user is already logged in
            const user = await this.account.get();
            console.log("User already logged in:", user);
        } catch (error) {
            console.log("No user logged in, proceeding with registration...");
    
            try {
                // Register user
                const newUser = await this.account.create(ID.unique(), email, password, name);
                console.log("User registered successfully:", newUser);
    
                // Send verification email
                await this.login({ email, password });
                await this.userVerification({email, password});
            } catch (error) {
                console.error("Registration failed:", error);
            }
        }
    }
    
    async userVerification(data) {
        try {
            // Check if user is logged in
            const user = await this.account.get();
            console.log("User logged in, sending verification email...", user);
            try {
                // Send verification email
                const redirectURL = window.location.origin + "/verify";
                const response = await this.account.createVerification(redirectURL);
                console.log("Verification email sent successfully", response);
            } catch (error) {
                console.error("Verification failed:", error);
            }
        } catch (error) {
            console.log("User is not logged in, trying to login again");
            await this.login(data);
            await this.userVerification(data);
        }
    }

    async updateUserVerification({ uid, code }) {
        try {
            this.account
                .updateVerification(uid, code)
                .then((res) => console.log("Verification Successful: ", res))
                .catch((err) =>
                    console.error("Error Occured during verification: ", err)
            );
        } catch (error) {
            console.log("Error Occured during verification: ", error)
        }
    }

    async login(data = null) {
        try {
            const user = await this.account.get(); // Check if user is already logged in
            console.log("User already logged in:", user);
        } catch (error) {
            console.log("No user logged in, proceeding with login...");
            if(data) {
                // User is not logged in, so initiate Email Password login
                this.account.createEmailPasswordSession(data.email, data.password);
            } else {
                // User is not logged in, so initiate Google login
                const redirectURL = window.location.origin; // Automatically detect current domain
                this.account.createOAuth2Session(OAuthProvider.Google, redirectURL, `${redirectURL}/login`);
            }
        }
    }

    async logout() {
        try {
            await this.account.deleteSession("current");
            window.location.reload(); // Refresh page after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    async getProfile() {
        try {
            const user = await this.account.get();
            console.log("User profile:", user);
            return user;
        } catch (error) {
            console.error("Failed to get user profile:", error);
        }
    }
}

export default AppwriteConfig;
