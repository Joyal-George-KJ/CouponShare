import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                    {[
                        "stores",
                        "categories",
                        "about",
                        "profile",
                        "settings",
                    ].map((route) => (
                        <li key={route}>
                            <NavLink
                                to={`/${route}`}
                                className={({ isActive }) =>
                                    `text-lg font-medium transition duration-300 hover:text-blue-400 ${
                                        isActive
                                            ? "text-blue-500 border-b-2 border-blue-500"
                                            : "text-white"
                                    }`
                                }
                            >
                                {route.charAt(0).toUpperCase() + route.slice(1)}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Auth Buttons */}
                <div className="hidden desktop:flex gap-4">
                    <NavLink
                        to="/login"
                        className="px-5 py-2 rounded-lg bg-neutral-800 shadow shadow-neutral-200 text-white font-semibold transition-transform hover:scale-105"
                    >
                        Login
                    </NavLink>
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
                <div
                    className={`fixed top-0 right-0 h-fit w-64 bg-neutral-800 bg-opacity-90 backdrop-blur-md p-6 transform ${
                        isOpen ? "" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out desktop:hidden`}
                >
                    <button
                        onClick={toggleMenu}
                        className="absolute top-5 right-5 text-white"
                    >
                        <X size={28} />
                    </button>

                    <ul className="mt-16 flex flex-col gap-6">
                        {[
                            "stores",
                            "categories",
                            "about",
                            "profile",
                            "settings",
                        ].map((route) => (
                            <li key={route}>
                                <NavLink
                                    to={`/${route}`}
                                    onClick={toggleMenu}
                                    className="text-lg text-white font-semibold transition-transform hover:scale-105 block"
                                >
                                    {route.charAt(0).toUpperCase() +
                                        route.slice(1)}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Auth Buttons */}
                    <div className="mt-6 flex flex-col gap-4">
                        <NavLink
                            to="/login"
                            onClick={toggleMenu}
                            className="block text-center px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold transition-transform hover:scale-105"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            onClick={toggleMenu}
                            className="block text-center px-5 py-2 rounded-lg bg-green-600 text-white font-semibold transition-transform hover:scale-105"
                        >
                            Sign Up
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
