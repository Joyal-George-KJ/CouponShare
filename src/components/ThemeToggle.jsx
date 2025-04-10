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
      className="transition-colors duration-300"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? <span className="text-xl">🌙</span> : <span className="text-xl">☀️</span>}
    </button>
  );
};

export default ThemeToggle;
