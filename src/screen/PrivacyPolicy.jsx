import React from "react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-10 text-left text-neutral-800 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-800">
            <Helmet>
                <title>Privacy Policy | CouponShare</title>
                <meta name="description" content="Learn how CouponShare collects, uses, and protects your data with our privacy policy." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://couponshare.joyalgeorgekj.com/privacy" />
            </Helmet>

            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-6">
                At <strong>CouponShare</strong>, your privacy is important to us. This policy outlines how we collect, use, and protect your personal data.
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Personal information (e.g., name, email address)</li>
                    <li>Usage data (e.g., how you interact with our platform)</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
                <p>We use your data to:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Provide and improve our services</li>
                    <li>Personalize your experience</li>
                    <li>Ensure the security of your account and data</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">3. Sharing Your Information</h2>
                <p>We do not sell your personal information. Data may be shared with trusted partners to help operate and maintain our services.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">4. Your Rights</h2>
                <p>You may request access, correction, or deletion of your personal information at any time.</p>
            </section>

            <footer className="text-sm text-neutral-500 dark:text-neutral-400 mt-12">
                Last Updated: April 13, 2025
            </footer>
        </main>
    );
};

export default PrivacyPolicy;
