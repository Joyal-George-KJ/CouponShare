import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "./util/store";
import NotFound from "./components/404";
const Home = lazy(() => import("./screen/Home"));
const About = lazy(() => import("./screen/About"));
const Stores = lazy(() => import("./screen/Stores"));
const Categories = lazy(() => import("./screen/Categories"));
const Login = lazy(() => import("./screen/Login"));
const Register = lazy(() => import("./screen/Register"));
const Profile = lazy(() => import("./screen/Profile"));
const Settings = lazy(() => import("./screen/Settings"));

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/stores" element={<Stores />} />
                    <Route path="/stores/:key/:value" element={<Stores key={window.location.pathname} />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
    </Provider>
);
