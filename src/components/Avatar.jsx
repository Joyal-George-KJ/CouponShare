import React from "react";

function Avatar({pic, className="w-24 h-24 rounded-full border-2 border-neutral-500"}) {
    const validateURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    pic = ((pic && validateURL.test(pic)) ? pic : pic?.split(' ').map((word) => word.charAt(0)).join(''));
    
    if (validateURL.test(pic)){
        return (
            <img
                src={pic}
                alt="Profile"
                className={className}
            />
        );
    } else {
        return (
            <div className={`${className} mobile:w-12 mobile:h-12 aspect-square flex items-center justify-center bg-neutral-700 text-white`}>
                {pic}
            </div>
        );
    }
}

export default Avatar;
