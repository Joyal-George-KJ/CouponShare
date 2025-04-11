import { Link } from "react-router-dom";
import { ShieldAlert, Home } from "lucide-react";

function Forbidden() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white text-center p-6">
            <ShieldAlert size={60} className="text-yellow-500 animate-bounce" />
            <h1 className="text-4xl font-bold mt-4">403 - Forbidden</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">You don’t have permission to access this page.</p>

            <Link to="/" className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
                <Home size={20} /> Return Home
            </Link>
        </div>
    );
}

export default Forbidden;
