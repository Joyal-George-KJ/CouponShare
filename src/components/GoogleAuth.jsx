import React from "react";
import { FcGoogle } from "react-icons/fc";
import AppwriteConfig from "../constants/AppwriteConf";
import { setUser } from "../util/slices/userSlice";
import { useDispatch } from "react-redux";

function GoogleAuth({ text }) {
    const dispatch = useDispatch();
    
    const onClick = async () => {
        const loginConfig = new AppwriteConfig(import.meta.env.VITE_APPWRITE_REDIRECT_URL, import.meta.env.VITE_APPWRITE_PROJECT_ID);
        const res = await loginConfig.login();

        dispatch(setUser(res));
    }

    return (
        <button
        type="button"
            onClick={onClick}
            className="w-full flex items-center justify-center gap-3 bg-white text-neutral-800 font-medium p-3 rounded-lg shadow hover:shadow-md transition-all border hover:bg-neutral-300 border-neutral-300 cursor-pointer"
        >
            <FcGoogle size={24} /> {text}
        </button>
    );
}

export default GoogleAuth;
