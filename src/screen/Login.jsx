import { useEffect, useState } from "react";
import GoogleAuth from "../components/GoogleAuth";
import { NavLink, useNavigate } from "react-router-dom";
import AppwriteConfig from "../constants/AppwriteConf";
import PasswordInput from "../components/PasswordInput";
import { useSelector } from "react-redux";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (user) {
            navigate("/403")
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const loginConfig = new AppwriteConfig(
            import.meta.env.VITE_APPWRITE_REDIRECT_URL,
            import.meta.env.VITE_APPWRITE_PROJECT_ID
        );
        loginConfig.login({ email, password });
        console.log("Logging in with:", { email, password });
    };

    return (
        <div className="min-h-[75dvh] flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white">
            <div className="bg-neutral-200 dark:bg-neutral-800 p-8 rounded-xl shadow shadow-neutral-400 dark:shadow-neutral-500 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center">Login</h2>
                <p className=" text-neutral-600 dark:text-neutral-400 text-center mt-2">
                    Welcome back! 👋
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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
                    <div className="w-full flex justify-end">
                        <NavLink className="text-neutral-700 dark:text-neutral-300 underline cursor-pointer dark:hover:text-neutral-400 transition-colors ease-in-out" to="/recovery">Forgot Password?</NavLink>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-blue-500 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-all cursor-pointer"
                    >
                        Login
                    </button>

                    <hr />

                    <GoogleAuth text={"Google"} />
                </form>

                <p className="text-center  text-neutral-600 dark:text-neutral-400 mt-4">
                    Don't have an account?{" "}
                    <NavLink
                        to={"/register"}
                        className="text-blue-400 hover:underline"
                    >
                        Sign Up
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
