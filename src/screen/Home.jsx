import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="relative w-full h-full bg-neutral-800 text-white py-20 flex flex-col items-center text-center">

            <h1 className="mobile:text-2xl tablet:text-4xl laptop:text-6xl font-extrabold tracking-tight">
                Save More, Spend Less 💰
            </h1>
            <p className="mt-4 text-lg md:text-xl text-neutral-300 max-w-2xl">
                Discover and share the best coupons online. Join the community
                and never miss a deal again!
            </p>

            <div className="mt-6 flex flex-row gap-4">
                <Link to={"/stores"} className="bg-green-500 text-white px-6 py-3 mobile:text-base md:text-lg font-medium rounded-lg hover:bg-green-600 transition-all">
                    Browse Coupons
                </Link>
                <button className="bg-neutral-700 text-white px-6 py-3 mobile:text-base md:text-lg font-medium rounded-lg hover:bg-neutral-600 transition-all">
                    Share a Coupon
                </button>
            </div>
        </div>
    );
}

export default Home;
