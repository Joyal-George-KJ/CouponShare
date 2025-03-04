import React from "react";
import { FcGoogle } from "react-icons/fc";

function GoogleAuth({ text, onClick }) {
    return (
        <button
        type="button"
            onClick={onClick}
            className="w-full flex items-center justify-center gap-3 bg-white text-neutral-800 font-medium p-3 rounded-lg shadow hover:shadow-md transition-all border border-neutral-300"
        >
            <FcGoogle size={24} /> {text}
        </button>
    );
}

export default GoogleAuth;
