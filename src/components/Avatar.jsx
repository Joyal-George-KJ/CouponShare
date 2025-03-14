import React from "react";

function Avatar({pic}) {
    return (
        <img
            src={pic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-neutral-500"
        />
    );
}

export default Avatar;
