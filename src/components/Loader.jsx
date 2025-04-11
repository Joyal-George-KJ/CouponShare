import React, { useEffect, useState } from "react";

function Loader() {
    const [loader, setLoader] = useState(1);

    useEffect(() => {
        const loadInterval = setInterval(() => {
            setLoader(prev => {
                if (prev >= 100) {
                    return 1;
                } else {
                    return prev+5;
                }
            });
        }, 50);

        return () => {
            clearInterval(loadInterval);
        };
    }, []);
    return (
        <div className="bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition ease-out w-full min-h-full flex flex-col place-items-center justify-center p-4 mobile:px-4 tablet:px-8 laptop:px-16">
            <h2
                to="/"
                className="text-3xl font-extrabold text-neutral-800 dark:text-white tracking-wide"
            >
                Coupon<span className="text-blue-500">Share</span>
            </h2>
            <input className="slider bg-neutral-400" type="range" name="loading" id="loading" min={1} max={100} value={loader} readOnly />
        </div>
    );
}

export default Loader;
