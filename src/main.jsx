import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "./util/store";
import NotFound from "./components/404";
import Unauthorized from "./components/401";
import Forbidden from "./components/403";
import ServerError from "./components/500";
import Recovery from "./screen/Recovery";
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
                        <Route
                            path="/stores/:key/:value"
                            element={<Stores key={window.location.pathname} />}
                        />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/recovery" element={<Recovery />} />
                    </Route>
                    <Route path="/401" element={<Unauthorized />} />
                    <Route path="/403" element={<Forbidden />} />
                    <Route path="/500" element={<ServerError />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </StrictMode>
    </Provider>
);
