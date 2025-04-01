import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 text-white text-center p-6">
            <AlertTriangle size={60} className="text-yellow-500 animate-bounce" />
            <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
            <p className="text-neutral-400 mt-2">Oops! The page you’re looking for doesn’t exist.</p>
            
            <Link to="/" className="mt-6 px-6 py-3 bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
                <Home size={20} /> Go Home
            </Link>
        </div>
    );
}

export default NotFound;