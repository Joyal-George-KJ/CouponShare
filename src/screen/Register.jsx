import { useState } from "react";
import GoogleAuth from "../components/GoogleAuth";
import AppwriteConfig from "../constants/AppwriteConf";
import { NavLink } from "react-router-dom";
import { Info } from "lucide-react";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggle, setToggle] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        const registerConfig = new AppwriteConfig(
            "https://cloud.appwrite.io/v1",
            import.meta.env.VITE_APPWRITE_PROJECT_ID
        );
        registerConfig.register(email, password, username);
        console.log("Registering with:", { username, email, password });
    };

    return (
        <div className="min-h-[75dvh] flex items-center justify-center bg-neutral-800 text-white">
            <div className="bg-neutral-800 p-8 rounded-xl shadow shadow-neutral-500 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center">Sign Up</h2>
                <p className="text-neutral-400 text-center mt-2">
                    Join us and start saving!
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 bg-neutral-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-neutral-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+-]).{8,12}$"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-neutral-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <Info
                            className="absolute top-3 right-3 text-neutral-300 cursor-pointer"
                            onClick={() => {
                                setToggle(true);
                                setTimeout(() => {
                                    setToggle(false);
                                }, 2000);
                            }}
                        />
                    </div>
                    {toggle ? (
                        <p className="text-yellow-400 text-sm">
                            Password must contain <br />
                            <li>At least 8 characters</li>{" "}
                            <li>1 uppercase letter</li>{" "}
                            <li>1 lowercase letter</li>{" "}
                            <li>1 number and 1 special character</li>
                        </p>
                    ) : (
                        <></>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-all cursor-pointer"
                    >
                        Sign Up
                    </button>

                    <hr />

                    <GoogleAuth text={"Google"} />
                </form>

                <p className="text-center text-neutral-400 mt-4">
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
