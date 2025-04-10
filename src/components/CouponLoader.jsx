import React from "react";

function CouponLoader() {
    return (
        <div className="w-full bg-neutral-400 dark:bg-neutral-700 animate-pulse grid gap-4 shadow-md p-6 shadow-neutral-100 dark:shadow-neutral-900 rounded-md">
            <div className="w-12 h-4 bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded"></div>
            <div className="w-full h-4 bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded"></div>
            <div className="w-full h-14 bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded"></div>
            <div className="w-full h-8 bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded"></div>
            <div className="flex items-center gap-4 border-t pt-4 animate-pulse border-neutral-600">
                <div className="w-24 aspect-square bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded-full"></div>
                <div className="w-full h-4 bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded"></div>
                <div className="w-full h-4 bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded"></div>
            </div>
        </div>
    );
}

export default CouponLoader;
