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
            await this.createUserDB({
                id: user.$id,
                email: user.email,
                name: user.name,
            });
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
                console.log(
                    "No user logged in, proceeding with Email Password Login..."
                );
                this.account.createEmailPasswordSession(
                    data.email,
                    data.password
                );
            } else {
                // User is not logged in, so initiate Google login
                const redirectURL = window.location.origin; // Automatically detect current domain
                let res = await this.account.createOAuth2Session(
                    OAuthProvider.Google,
                    redirectURL,
                    `${redirectURL}`
                );
            }
        }
    }

    async googleProfileFetch(token) {
        // Fetch Google profile using the provided ID
        try {
            let response = await fetch(
                "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
                    token
            ).then((res) => res.json());
            if (response?.error) {
                console.log("Credentials expired Re-Log and try again!");
                
            } else {
                console.log("Google profile fetched successfully:", response);
                return response;
            }
        } catch (error) {
            console.error("Failed to fetch Google profile:", error);
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
            let userDetails = await this.getUserDB({ id: user.userId });
            userDetails = userDetails.documents[0];

            if (!userDetails?.avatar) {
                const res = await this.googleProfileFetch(
                    user.providerAccessToken
                );

                if (res?.picture) {
                    await this.updateUserDB({
                        documentId: userDetails.$id,
                        key: "avatar",
                        value: res.picture,
                    });
                }
            }

            console.log("UserDetails: ", userDetails);
            return userDetails
                ? userDetails
                : false;
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
                            avatar: data.avatar ? data.avatar : null,
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

    async updateUserDB({ documentId, key, value }) {
        try {
            this.database = new Databases(this.client);
            const res = await this.database.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
                documentId,
                {
                    [key]: value,
                }
            );

            console.log("updatad Response: ", res);
        } catch (err) {
            console.error(err);
        }
    }

    async getUserDB({ id }) {
        try {
            this.database = new Databases(this.client);
            const res = await this.database.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
                [Query.equal("id", id)]
            );

            if (res.total !== 0) {
                return res;
            }
            return false;
        } catch (error) {
            console.error("Failed to create document:", error);
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
