import React from "react";
import { Helmet } from "react-helmet";

const TermsAndConditions = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-10 text-left text-neutral-800 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-800">
            <Helmet>
                <title>Terms & Conditions | CouponShare</title>
                <meta name="description" content="Read the terms and conditions of using CouponShare responsibly and safely." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://couponshare.joyalgeorgekj.com/terms" />
            </Helmet>

            <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>

            <p className="mb-6">Welcome to <strong>CouponShare</strong>. By using our website, you agree to the following terms and conditions.</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p>Using our platform means you agree to be bound by these terms and our Privacy Policy.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">2. Eligibility</h2>
                <p>You must be at least 13 years old to use CouponShare.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Provide accurate account information</li>
                    <li>Keep login details confidential</li>
                    <li>Be responsible for activities on your account</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">4. Content and Coupon Use</h2>
                <p>Coupons are shared by users and third-party providers. We do not guarantee the accuracy or availability of coupons.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">5. Prohibited Behavior</h2>
                <p>No scraping, abusing, or sharing malicious content. Violations may result in suspension or legal action.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
                <p>We may modify these terms anytime. Continued use means you accept the changes.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
                <p>Email: <a href="mailto:support@joyalgeorgekj.com" className="text-blue-500 underline">support@joyalgeorgekj.com</a></p>
            </section>

            <footer className="text-sm text-neutral-500 dark:text-neutral-400 mt-12">
                Last Updated: April 13, 2025
            </footer>
        </main>
    );
};

export default TermsAndConditions;
