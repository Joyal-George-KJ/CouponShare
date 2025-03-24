import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppwriteConfig from "./constants/AppwriteConf";
import { useDispatch } from "react-redux";
import { setUser } from "./util/slices/userSlice";
import Loader from "./components/Loader";

function Layout() {
    const message = "This is a message from Layout component";
    const [toggle, setToggle] = useState(true);
    const [loading, setLoading] = useState(true);

    const config = new AppwriteConfig(
        "https://cloud.appwrite.io/v1",
        import.meta.env.VITE_APPWRITE_PROJECT_ID
    );

    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            setToggle(false);
        }, 3000);

        const searchForUser = async () => {
            setLoading(true);
            let res = await config.getUserProfile();
            if (res) {
                dispatch(setUser(res));
                await config.createUserDB({id: res.userId, email: res.email, name: res.name});
                setLoading(false);
            } else {
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        };

        searchForUser();
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="bg-neutral-800 text-neutral-200 w-full flex justify-center items-center min-h-dvh p-4 mobile:px-4 tablet:px-8 laptop:px-16">
                <Loader />
            </div>
        );
    } else {
        return (
            <div className="mobile:bg-neutral-800">
                <Navbar />
                <div className="bg-neutral-800 text-neutral-200 w-full min-h-[92dvh] p-4 mobile:px-4 tablet:px-8 laptop:px-16">
                    <Outlet />
                </div>
                {toggle && (
                    <div className="fixed bottom-4 right-4 bg-green-200 text-green-900 p-2 rounded font-medium border-2 border-green-900">
                        {message}
                    </div>
                )}
            </div>
        );
    }
}

export default Layout;
