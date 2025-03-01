import React, { useState } from "react";

function CouponCard({tags, title, description, expiryDate, code}) {
    const [toggleCode, setToggleCode] = useState(false);

    return (
        <div className="flex flex-col gap-2 p-4 bg-neutral-800 rounded-lg shadow shadow-neutral-200 w-[32%]">
            <div className="flex flex-row flex-wrap gap-2">
                {tags.map((val, ind) => <span className="p-1 bg-neutral-700 font-medium capitalize px-2 cursor-pointer" key={ind}>{val}</span>)}
            </div>
            <h2 className="text-lg capitalize font-bold text-neutral-100 ">
                {title}
            </h2>{" "}
            {/*Coupon Name*/}
            <p className="text-base text-neutral-300 capitalize">
                {description}
            </p>{" "}
            {/*Coupon Description*/}
            <span className="text-base text-neutral-400 capitalize">
                valid till: {expiryDate}
            </span>{" "}
            {/*Coupon Expiry Date*/}
            {toggleCode ? (
                <input
                    type="text"
                    name=""
                    className="border border-neutral-400 bg-neutral-200 text-neutral-950 p-2 rounded font-medium cursor-pointer"
                    disabled
                    id=""
                    value={code} /*Coupon Code*/
                />
            ) : (
                <button
                    className="bg-neutral-200 text-neutral-900 py-2 rounded font-medium cursor-pointer uppercase"
                    onClick={() => setToggleCode(true)}
                >
                    Get Code
                </button>
            )}
        </div>
    );
}

export default CouponCard;
