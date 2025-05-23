import React, { useEffect, useState } from "react";
import AppwriteConfig from "../constants/AppwriteConf";
import PasswordInput from "../components/PasswordInput";

function Recovery() {
    const [email, setEmail] = useState("");
    const [secret, setSecret] = useState("");
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const config = new AppwriteConfig(
        import.meta.env.VITE_APPWRITE_REDIRECT_URL,
        import.meta.env.VITE_APPWRITE_PROJECT_ID
    );

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setSecret((prev) => urlParams.get("secret"));
        setUserID((prev) => urlParams.get("userId"));
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        let res;
        if (secret && userID) {
            res = config.forgotPassword({ userID, secret, password });
        } else {
            res = config.forgotPassword({ email: email });
        }
        console.log(res);
    };

    return (
        <div className="min-h-[75dvh] flex items-center justify-center bg-neutral-200 dark:bg-neutral-900 text-black dark:text-white">
            <div className="bg-neutral-200 dark:bg-neutral-800 p-8 rounded-xl shadow shadow-neutral-500 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center">
                    Password Recovery
                </h2>
                <form className="mt-6 space-y-4" onSubmit={handleLogin}>
                    {secret && userID ? (
                        <PasswordInput
                            pattern={
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+-]).{8,20}$/i
                            }
                            placeholder={"New Password"}
                            password={password}
                            setPassword={setPassword}
                        />
                    ) : (
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-neutral-300 dark:bg-neutral-700 rounded-lg text-black dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 py-3 text-white rounded-lg text-lg font-medium hover:bg-blue-600 transition-all cursor-pointer"
                    >
                        Send Link
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Recovery;
