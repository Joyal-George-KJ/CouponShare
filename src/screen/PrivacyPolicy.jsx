import React from "react";

function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">
                At CouponShare, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Personal identification information (Name, email address, etc.)</li>
                <li>Usage data (how you interact with our platform)</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
            <p className="mb-4">We use your information to provide and improve our services, personalize user experience, and ensure security.</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
            <p className="mb-4">We do not sell or trade your personal information. We may share data with trusted partners to operate our service.</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
            <p className="mb-4">You can request access, correction, or deletion of your data at any time.</p>

            <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">Last updated: April 9, 2025</p>
        </div>
    );
}

export default PrivacyPolicy;
