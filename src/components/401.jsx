import { Link } from "react-router-dom";
import { Lock, LogIn } from "lucide-react";

function Unauthorized() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 text-white text-center p-6">
            <Lock size={60} className="text-red-500 animate-bounce" />
            <h1 className="text-4xl font-bold mt-4">401 - Unauthorized</h1>
            <p className="text-neutral-400 mt-2">You need to log in to access this page.</p>

            <Link to="/login" className="mt-6 px-6 py-3 bg-green-600 rounded-lg flex items-center gap-2 hover:bg-green-700 transition">
                <LogIn size={20} /> Log In
            </Link>
        </div>
    );
}

export default Unauthorized;
