import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
    const message = "This is a message from Layout component";
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setToggle(false);
        }, 3000);
        return () => clearTimeout(timer);
    })

    return (
        <div className="mobile:bg-neutral-800">
            <Navbar />
            <div className="bg-neutral-800 text-neutral-200 w-full min-h-[92dvh] p-4 mobile:px-4 tablet:px-8 laptop:px-16">
                <Outlet />
            </div>
            {toggle && <div className="fixed bottom-4 right-4 bg-green-200 text-green-900 p-2 rounded font-medium border-2 border-green-900">{message}</div>}
        </div>
    );
}

export default Layout;
