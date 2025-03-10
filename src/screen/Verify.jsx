import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppwriteConfig from "../constants/AppwriteConf";

function Verify() {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Verifying...");

    useEffect(() => {
        const Auth = new AppwriteConfig(
            "https://cloud.appwrite.io/v1",
            "67c6a635003603605fbc"
        );

        const userId = searchParams.get("userId");
        const secret = searchParams.get("secret");

        if (userId && secret) {
            Auth.updateUserVerification({ uid: userId, code: secret })
                .then(() => {
                    setMessage("Your account has been verified! You can now log in.");
                })
                .catch(() => {
                    setMessage("Verification failed. The link may be expired or invalid.");
                });
        } else {
            setMessage("Invalid verification link.");
        }
    }, [searchParams]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-2xl font-bold">{message}</h1>
        </div>
    );
}

export default Verify;
