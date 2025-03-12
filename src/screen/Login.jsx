import { useState } from "react";
import GoogleAuth from "../components/GoogleAuth";
import { NavLink } from "react-router-dom";
import AppwriteConfig from "../constants/AppwriteConf";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const loginConfig = new AppwriteConfig('https://cloud.appwrite.io/v1', import.meta.env.VITE_APPWRITE_PROJECT_ID);
    loginConfig.login({ email, password });
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="min-h-[75dvh] flex items-center justify-center bg-neutral-800 text-white">
      <div className="bg-neutral-800 p-8 rounded-xl shadow shadow-neutral-500 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <p className="text-neutral-400 text-center mt-2">Welcome back! 👋</p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-neutral-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-neutral-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-all cursor-pointer"
          >
            Login
          </button>

          <hr />
          
          <GoogleAuth text={"Google"} />
        </form>

        <p className="text-center text-neutral-400 mt-4">
          Don't have an account?{" "}
          <NavLink to={"/register"} className="text-blue-400 hover:underline">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;