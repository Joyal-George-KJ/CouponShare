import { Client, Account, OAuthProvider, ID } from "appwrite";

class AppwriteConfig {
    constructor(END_POINT, PROJECT_ID) {
        this.client = new Client()
            .setEndpoint(END_POINT)
            .setProject(PROJECT_ID);
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
                const newUser = await this.account.create(
                    ID.unique(),
                    email,
                    password,
                    name
                );
                console.log("User registered successfully:", newUser);

                // Send verification email
                await this.login({ email, password });
                await this.userVerification({ email, password });
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
                const redirectURL = "https://verification.joyalgeorgekj.com/?projectId=" + import.meta.env.VITE_APPWRITE_PROJECT_ID;
                const response = await this.account.createVerification(
                    redirectURL
                );
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

    async login(data = null) {
        try {
            const user = await this.account.get(); // Check if user is already logged in
            console.log("User already logged in:", user);
        } catch (error) {
            console.log("No user logged in, proceeding with login...");
            if (data) {
                // User is not logged in, so initiate Email Password login
                this.account.createEmailPasswordSession(
                    data.email,
                    data.password
                );
            } else {
                // User is not logged in, so initiate Google login
                const redirectURL = window.location.origin; // Automatically detect current domain
                this.account.createOAuth2Session(
                    OAuthProvider.Google,
                    redirectURL,
                    `${redirectURL}`
                );
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

    async getUserProfile() {
        try {
            // Fetch user profile from Appwrite
            const user = await this.account.get();
            console.log("User profile from Appwrite:", user);
    
            // Try to get the Google OAuth details if available
            let userDetails = {};
            try {
                const session = await this.account.getSession('current');
                if (session?.providerAccessToken) {
                    const response = await fetch(
                        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${session.providerAccessToken}`
                    );
    
                    if (!response.ok) {
                        throw new Error("Failed to fetch Google user info");
                    }
    
                    const googleData = await response.json();
                    userDetails = {
                        email: googleData.email,
                        name: googleData.name,
                        picture: googleData.picture
                    };
                } else {
                    console.warn("No valid Google access token found.");
                }
            } catch (googleError) {
                console.error("Error fetching Google user details:", googleError);
            }
    
            // Merge data from both sources (Appwrite and Google)
            return {
                userId: user.$id,
                email: user.email || userDetails.email,
                name: user.name || userDetails.name,
                avatar: userDetails.picture || null, // Use Google picture if available
                registration: user.registration,
                status: user.status,
                provider: user.provider // May contain OAuth provider info
            };
        } catch (err) {
            console.error("Failed to get complete user profile:", err);
            return null;
        }
    }
    
    
}

export default AppwriteConfig;
