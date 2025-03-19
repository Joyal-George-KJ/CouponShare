import React, { useState } from "react";

function CouponCard({ tags, title, description, expiryDate, code }) {
    const [toggleCode, setToggleCode] = useState(false);
    const activater = async () => {
        setToggleCode(!toggleCode);
        navigator.clipboard.writeText(code);
        
        setTimeout(() => {
            setToggleCode(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col gap-2 p-4 bg-neutral-800 rounded-lg shadow shadow-neutral-700 w-full hover:scale-105 transition ease-in-out hover:bg-neutral-700">
            <div className="flex flex-row flex-wrap gap-2">
                {tags.map((val, ind) => (
                    <span
                        className="p-1 bg-neutral-700 font-medium capitalize px-2 cursor-pointer"
                        key={ind}
                    >
                        {val}
                    </span>
                ))}
            </div>
            <h2 className="text-lg capitalize font-bold text-neutral-100 ">
                {title}
            </h2>{" "}
            {/*Coupon Name*/}
            <p className="text-base text-neutral-300 capitalize">
                {description}
            </p>{" "}
            {/*Coupon Description*/}
            <button
                className="bg-neutral-200 text-neutral-900 py-2 rounded font-medium cursor-pointer capitalize"
                onClick={activater}
            >
                Get Deal
            </button>
            {
                toggleCode && (
                    <div className="text-green-300 text-center bg-neutral-800 py-2 px-4 rounded font-medium cursor-default select-none capitalize border-2 border-green-300 fixed bottom-6 right-6 animate-slide-in">
                        Code Copied to Clipboard
                    </div>)
            }
        </div>
    );
}

export default CouponCard;
