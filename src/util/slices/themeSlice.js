import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDarkMode: localStorage.getItem("theme") === "dark",
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
            document.documentElement.classList.toggle("dark", state.isDarkMode);
        },
        setTheme: (state, action) => {
            state.isDarkMode = action.payload === "dark";
            localStorage.setItem("theme", action.payload);
            document.documentElement.classList.toggle("dark", state.isDarkMode);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
