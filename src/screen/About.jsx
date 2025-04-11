import React from "react";

function About() {
    return (
        <div className="h-fit bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-white px-6">
            <h1 className="text-xl font-bold mb-4">About CouponShare</h1>
            <p className="mb-4 text-lg text-neutral-700 dark:text-neutral-300">
                CouponShare is a community-driven platform where users can find
                and share the best coupons and discount codes online. Our
                mission is simple — to help people save money while also giving
                back to the community.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-2">
                Why CouponShare?
            </h2>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2">
                <li>
                    🛍️ Find real-time discounts and promo codes shared by users
                    just like you.
                </li>
                <li>
                    🤝 Contribute by sharing deals you've found online and help
                    others save.
                </li>
                <li>
                    🌍 Community-focused — the more you share, the more everyone
                    benefits.
                </li>
                <li>
                    🔒 Privacy-focused, ad-free experience with modern web
                    standards.
                </li>
            </ul>

            <p className="mt-8 text-neutral-600 dark:text-neutral-400 text-sm">
                Built with ❤️ using React, Tailwind CSS, Appwrite & community
                contributions.
            </p>
        </div>
    );
}

export default About;
