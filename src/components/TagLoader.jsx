import React from "react";

function TagLoader() {
    return (
        <div className="w-fit justify-center items-center bg-neutral-300 dark:bg-neutral-700 animate-pulse flex gap-4 shadow-md p-4 shadow-neutral-100 dark:shadow-neutral-900 rounded-md">
            <div className="w-18 h-4 bg-neutral-400 dark:bg-neutral-600 animate-pulse rounded"></div>
            <div className="w-6 aspect-square bg-neutral-400 dark:bg-neutral-600 animate-pulse rounded-full"></div>
        </div>
    );
}

export default TagLoader;
