import React, { useEffect, useState } from "react";

function Loader({ text }) {
    const [loadingText, setLoadingText] = useState(!text && "Loading");
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText((prev) => {
                if (prev === "Loading") return "Loading.";
                if (prev === "Loading.") return "Loading..";
                if (prev === "Loading..") return "Loading...";
                return "Loading";
            });
            console.log("Loading text changed");
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="bg-neutral-800 text-neutral-200 transition ease-out w-full min-h-full flex place-items-center justify-center p-4 mobile:px-4 tablet:px-8 laptop:px-16">
            <div className="w-14 aspect-square rounded-full border-8 border-white relative animate-pulse"></div>
            <p
                className="px-4 animate-pulse text-2xl"
                style={{
                    minWidth: `${"loading...".length * 20}px`,
                }}
            >
                {loadingText}
            </p>
        </div>
    );
}

export default Loader;
