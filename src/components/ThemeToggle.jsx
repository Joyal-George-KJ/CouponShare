import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;