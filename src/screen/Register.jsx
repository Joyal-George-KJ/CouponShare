import { useEffect, useState } from "react";
import GoogleAuth from "../components/GoogleAuth";
import AppwriteConfig from "../constants/AppwriteConf";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { useSelector } from "react-redux";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (user) {
            navigate("/403");
        }
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();
        const registerConfig = new AppwriteConfig(
            import.meta.env.VITE_APPWRITE_REDIRECT_URL,
            import.meta.env.VITE_APPWRITE_PROJECT_ID
        );
        registerConfig.register(email, password, username);
        console.log("Registering with:", { username, email, password });
    };

    return (
        <div className="min-h-[75dvh] flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white">
            <div className="bg-neutral-200 dark:bg-neutral-800 p-8 rounded-xl shadow shadow-neutral-500 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center">Sign Up</h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-center mt-2">
                    Join us and start saving!
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 bg-neutral-300 dark:bg-neutral-700 rounded-lg text-black dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-neutral-300 dark:bg-neutral-700 rounded-lg text-black dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <PasswordInput
                        pattern={
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+-]).{8,20}$/i
                        }
                        setPassword={setPassword}
                        placeholder={"Password"}
                        key={"1"}
                        password={password}
                    />

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            required
                            className="accent-blue-500"
                        />
                        <label htmlFor="terms" className="text-sm">
                            I agree to the{" "}
                            <NavLink
                                to="/terms"
                                className="text-blue-400 underline"
                            >
                                Terms & Conditions
                            </NavLink>{" "}
                            and{" "}
                            <NavLink
                                to="/privacy"
                                className="text-blue-400 underline"
                            >
                                Privacy Policy
                            </NavLink>
                            .
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 py-3 text-white rounded-lg text-lg font-medium hover:bg-blue-600 transition-all cursor-pointer disabled:opacity-60"
                        disabled={!agreed}
                    >
                        Sign Up
                    </button>

                    <hr />

                    <GoogleAuth text={"Google"} />
                </form>

                <p className="text-center text-neutral-600 dark:text-neutral-400 mt-4">
                    Already have an account?{" "}
                    <NavLink
                        to={"/login"}
                        className="text-blue-400 hover:underline"
                    >
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Register;
