import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import AppwriteConfig from "../constants/AppwriteConf";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false); // Start with false
    const user = useSelector((state) => state.user.user);
    const [profile, setProfile] = useState({
        avatar: "https://via.placeholder.com/100",
    });
    const Auth = new AppwriteConfig(
        import.meta.env.VITE_APPWRITE_REDIRECT_URL,
        import.meta.env.VITE_APPWRITE_PROJECT_ID
    );

    // Check login status when component mounts
    useEffect(() => {
        const checkAuth = () => {
            const res = user;
            res ? setIsLogged(true) : setIsLogged(false);
            setProfile(res);
        };
        checkAuth();
        setIsOpen(false);
    }, [user]);

    const handleLogout = async () => {
        try {
            await Auth.logout();
            setIsLogged(false); // Update state after logout
        } catch (error) {
            console.error("Logout failed:", error);
            setIsLogged(true); // Update state after failed logout
        }
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="sticky top-0 left-0 w-full bg-opacity-50 backdrop-blur-md shadow-lg z-50">
            <div className="flex justify-between items-center p-4 mobile:px-4 tablet:px-8 laptop:px-16">
                {/* Logo */}
                <NavLink
                    to="/"
                    className="text-3xl font-extrabold text-white tracking-wide"
                >
                    Coupon<span className="text-blue-500">Share</span>
                </NavLink>

                {/* Desktop Menu */}
                <ul className="hidden desktop:flex gap-8">
                    {["stores", "categories", "about", "settings"].map(
                        (route) => (
                            <li key={route}>
                                <NavLink
                                    to={`/${route}`}
                                    className={({ isActive }) =>
                                        `text-lg font-medium transition duration-300 hover:text-blue-400 cursor-pointer ${
                                            isActive
                                                ? "text-blue-500 border-b-2 border-blue-500"
                                                : "text-white"
                                        }`
                                    }
                                >
                                    {route.charAt(0).toUpperCase() +
                                        route.slice(1)}
                                </NavLink>
                            </li>
                        )
                    )}
                </ul>

                {/* Auth Buttons */}
                <div className="hidden desktop:flex gap-4">
                    {isLogged ? (
                        <>
                            <NavLink to="/profile">
                                <Avatar
                                    pic={
                                        profile.avatar
                                            ? profile.avatar
                                            : profile.name
                                    }
                                    className={`${
                                        profile?.avatar ? "w-18" : "w-12"
                                    } rounded-full`}
                                />
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-500 text-neutral-200 px-4 py-2 rounded-lg text-lg font-medium hover:bg-red-600 transition-all cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink
                            to="/login"
                            className="w-full bg-blue-500 text-neutral-200 px-4 py-2 rounded-lg text-lg font-medium hover:bg-blue-600 transition-all cursor-pointer"
                        >
                            Login
                        </NavLink>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="desktop:hidden text-white"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed top-0 right-0 h-fit w-64 bg-neutral-800 bg-opacity-90 backdrop-blur-md p-6 transition-transform duration-300 ease-in-out desktop:hidden">
                    <button
                        onClick={toggleMenu}
                        className="absolute top-5 right-5 text-white"
                    >
                        <X size={28} />
                    </button>

                    <ul className="mt-16 flex flex-col gap-6">
                        {["stores", "categories", "about", "settings"].map(
                            (route) => (
                                <li key={route}>
                                    <NavLink
                                        to={`/${route}`}
                                        onClick={toggleMenu}
                                        className="text-lg text-white font-semibold transition-transform hover:scale-105 block cursor-pointer"
                                    >
                                        {route.charAt(0).toUpperCase() +
                                            route.slice(1)}
                                    </NavLink>
                                </li>
                            )
                        )}
                    </ul>

                    {/* Auth Buttons */}
                    <div className="mt-6 flex flex-col gap-4">
                        {isLogged ? (
                            <>
                                <NavLink to={"/profile"}>
                                    <img
                                        src={profile.avatar}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full border-2 border-neutral-500 cursor-pointer object-cover"
                                    />
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-500 text-neutral-200 px-4 py-2 rounded-lg text-lg font-medium hover:bg-red-600 transition-all cursor-pointer"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavLink
                                to="/login"
                                className="w-full bg-blue-500 text-neutral-200 px-4 py-2 rounded-lg text-lg font-medium hover:bg-blue-600 transition-all cursor-pointer"
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
