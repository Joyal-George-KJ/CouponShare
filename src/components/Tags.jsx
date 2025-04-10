import React from "react";
import { NavLink } from "react-router-dom";

function Tags({ name, count }) {
    return (
        <NavLink to={`/stores/tags/${name}`} className=" text-neutral-800 dark:text-neutral-100">
            <div className="p-4 bg-neutral-300 dark:bg-neutral-700 rounded-lg w-fit flex justify-center items-center gap-2 transition ease-in-out hover:scale-105 cursor-pointer">
                <h2 className="text-base capitalize font-semibold  text-neutral-800 dark:text-neutral-100">
                    {name}
                </h2>
                <p className="text-base text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-600 rounded-full px-2 capitalize">
                    {count}
                </p>
            </div>
        </NavLink>
    );
}

export default Tags;
