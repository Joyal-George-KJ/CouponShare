import { Client, Account, OAuthProvider, ID, Databases, Query } from "appwrite";

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
            await this.createUserDB({id: user.$id, email: user.email, name: user.name});
            console.log("User logged in, sending verification email...", user);
            try {
                // Send verification email
                const redirectURL =
                    "https://verification.joyalgeorgekj.com/?projectId=" +
                    import.meta.env.VITE_APPWRITE_PROJECT_ID;
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
                console.log("No user logged in, proceeding with Email Password Login...");
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
            const user = await this.account.getSession("current");
            console.log("User profile from Appwrite:", user);

            // Try to get the Google OAuth details if available
            let userDetails = {};
            try {
                const session = await this.account.getSession("current");
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
                        picture: googleData.picture,
                    };
                } else {
                    console.warn("No valid Google access token found.");
                }
            } catch (googleError) {
                return user
                    ? {
                          userId: user.$id,
                          email: user.email || userDetails.email,
                          name: user.name || userDetails.name,
                          avatar: userDetails.picture || null, // Use Google picture if available
                          registration: user.registration,
                          status: user.status,
                          provider: user.provider, // May contain OAuth provider info
                      }
                    : false;
            }

            // Merge data from both sources (Appwrite and Google)
            return {
                userId: user.$id,
                email: user.email || userDetails.email,
                name: user.name || userDetails.name,
                avatar: userDetails.picture || null, // Use Google picture if available
                registration: user.registration,
                status: user.status,
                provider: user.provider, // May contain OAuth provider info
            };
        } catch (err) {
            return false;
        }
    }

    async createCoupon(data) {
        try {
            await this.getUserProfile();
            // Fetch coupons from Appwrite
            try {
                this.database = new Databases(this.client);
                this.database.createDocument(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COUPON_COLLECTION_ID,
                    ID.unique(),
                    data
                );

                data.tags.map(async (val) => await this.addTag(val));
            } catch (error) {
                console.error("Failed to create document:", error);
            }
        } catch (error) {
            console.error("Failed to get user profile:", error);
        }
    }

    async getCoupons(key, value) {
        try {
            try {
                this.database = new Databases(this.client);

                return await this.database.listDocuments(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COUPON_COLLECTION_ID,
                    [key && value ? Query.equal(key, value) : Query.limit(25)]
                );
            } catch (error) {
                console.error("Failed to create document:", error);
            }
        } catch (error) {
            console.error("Failed to get user profile:", error);
        }
    }

    async createUserDB(data) {
        try {
            let res = await this.getUserDB({ id: data.id });
            if (res.total === 0) {
                try {
                    const database = new Databases(this.client);
                    database.createDocument(
                        import.meta.env.VITE_APPWRITE_DATABASE_ID,
                        import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
                        ID.unique(),
                        {
                            id: data.id,
                            email: data.email,
                            name: data.name,
                        }
                    );
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error("Failed to get user profile:", error);
        }
    }

    async getUserDB({ id }) {
        try {
            try {
                this.database = new Databases(this.client);
                return await this.database.listDocuments(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
                    [Query.equal("id", id)]
                );
            } catch (error) {
                console.error("Failed to create document:", error);
            }
        } catch (error) {
            console.error("Failed to get user profile:", error);
        }
    }

    async addTag(tag) {
        try {
            await this.getUserProfile();
            // Fetch tags from Appwrite
            try {
                this.database = new Databases(this.client);
                let res = await this.getTags(tag);
                if (res.total !== 0 && tag !== "") {
                    console.log(res);
                    this.database.updateDocument(
                        import.meta.env.VITE_APPWRITE_DATABASE_ID,
                        import.meta.env.VITE_APPWRITE_TAG_COLLECTION_ID,
                        res.documents[0].$id,
                        { count: res.documents[0].count + 1 }
                    );
                } else {
                    this.database.createDocument(
                        import.meta.env.VITE_APPWRITE_DATABASE_ID,
                        import.meta.env.VITE_APPWRITE_TAG_COLLECTION_ID,
                        ID.unique(),
                        { tag, count: 1 }
                    );
                }
            } catch (error) {
                console.error("Failed to create document:", error);
            }
        } catch (error) {
            console.error("Failed to get user profile:", error);
        }
    }

    async getTags(tag = null) {
        if (tag !== null) {
            try {
                this.database = new Databases(this.client);
                return await this.database.listDocuments(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_TAG_COLLECTION_ID,
                    [Query.equal("tag", tag)]
                );
            } catch (error) {
                console.error("Failed to create document:", error);
                return false;
            }
        } else {
            try {
                this.database = new Databases(this.client);
                return await this.database.listDocuments(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_TAG_COLLECTION_ID,
                    [Query.limit(25)]
                );
            } catch (error) {
                console.error("Failed to create document:", error);
                return false;
            }
        }
    }
}

export default AppwriteConfig;
