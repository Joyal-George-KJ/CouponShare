import { Link } from "react-router-dom";
import { Bug, RefreshCcw } from "lucide-react";

function ServerError() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white text-center p-6">
            <Bug size={60} className="text-red-500 animate-bounce" />
            <h1 className="text-4xl font-bold mt-4">500 - Server Error</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">Oops! Something went wrong on our side.</p>

            <Link to="/" className="mt-6 px-6 py-3 text-white bg-red-600 rounded-lg flex items-center gap-2 hover:bg-red-700 transition">
                <RefreshCcw size={20} /> Try Again
            </Link>
        </div>
    );
}

export default ServerError;
