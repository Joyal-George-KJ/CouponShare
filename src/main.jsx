import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
const Home = lazy(() => import("./screen/Home"));
const About = lazy(() => import("./screen/About"));
const Stores = lazy(() => import("./screen/Stores"));
const Categories = lazy(() => import("./screen/Categories"));
const Login = lazy(() => import("./screen/Login"));
const Register = lazy(() => import("./screen/Register"));
const Profile = lazy(() => import("./screen/Profile"));
const Settings = lazy(() => import("./screen/Settings"));

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/stores" element={<Stores />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
