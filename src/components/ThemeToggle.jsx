// ThemeToggle.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, toggleTheme } from "../util/slices/themeSlice";

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        dispatch(setTheme(savedTheme));
    }, [dispatch]);

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            className="transition-colors w-fit mobile:w-full dark:bg-neutral-700 bg-neutral-300 p-2 py-1 pb-2 rounded-full duration-300"
            aria-label="Toggle Theme"
        >
            <span className="text-xl">{isDarkMode ? "🌙" : "☀️"}</span>
        </button>
    );
};

export default ThemeToggle;
