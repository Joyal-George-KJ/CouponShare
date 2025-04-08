import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Home() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const couponAddHandle = () => {
        if (user) {
            navigate("/stores");
        } else {
            navigate("/401");
        }
    };
    return (
        <div className="w-full h-full bg-neutral-800 text-white py-20 px-6 flex flex-col items-center mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Save More, Spend Less 💰
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-neutral-300 max-w-2xl">
                Discover and share the best coupons online. Join our community
                and never miss a deal again!
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <NavLink
                    to="/stores"
                    className="bg-blue-600 text-white px-6 py-3 text-lg font-medium rounded-lg hover:bg-blue-700 transition-all shadow shadow-white"
                >
                    Browse Coupons
                </NavLink>
                <button
                    onClick={couponAddHandle}
                    className="bg-white text-blue-600 px-6 py-3 text-lg font-medium rounded-lg hover:bg-neutral-200 transition-all shadow shadow-blue-600"
                >
                    Share a Coupon
                </button>
            </div>

            <div className="mt-8 grid gap-4 max-w-3xl laptop:grid-cols-2 mobile:grid-cols-1 text-center text-neutral-400">
                <div className="flex gap-2 items-start p-8 bg-neutral-900 rounded-lg shadow-md">
                    <span className="text-green-400 text-xl">✓</span>
                    <p>
                        💸 Use coupons to slash prices on your favorite products
                        and services.
                    </p>
                </div>
                <div className="flex gap-2 items-start p-8 bg-neutral-900 rounded-lg shadow-md">
                    <span className="text-green-400 text-xl">✓</span>
                    <p>
                        🤝 Help others in your community save by sharing
                        verified deals.
                    </p>
                </div>
                <div className="flex gap-2 items-start p-8 bg-neutral-900 rounded-lg shadow-md">
                    <span className="text-green-400 text-xl">✓</span>
                    <p>
                        🔎 Easily search by tags, brand, or category to find the
                        perfect deal.
                    </p>
                </div>
                <div className="flex gap-2 items-start p-8 bg-neutral-900 rounded-lg shadow-md">
                    <span className="text-green-400 text-xl">✓</span>
                    <p>🎯 100% free, user-powered and privacy-focused.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
