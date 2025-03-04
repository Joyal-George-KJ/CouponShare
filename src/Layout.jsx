import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
    return (
        <div className="mobile:bg-neutral-800">
            <Navbar />
            <div className="bg-neutral-800 text-neutral-200 w-full min-h-[92dvh] p-4 mobile:px-4 tablet:px-8 laptop:px-16">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
