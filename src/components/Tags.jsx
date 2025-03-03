import React from "react";

function Tags({ name, count }) {
    return (
        <div
            className="p-4 bg-neutral-800 rounded-lg w-fit flex justify-center items-center gap-2 transition-all hover:bg-neutral-700 cursor-pointer"
        >
            <h2 className="text-base capitalize font-semibold text-neutral-100">
                {name}
            </h2>
            <p className="text-base text-neutral-300 bg-neutral-700 rounded-full px-2 capitalize">
                {count}
            </p>
        </div>
    );
}

export default Tags;
