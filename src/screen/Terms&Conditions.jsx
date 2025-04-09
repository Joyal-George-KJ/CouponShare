import React from "react";

function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
            <p className="mb-4">
                Welcome to CouponShare. By accessing or using our service, you agree to be bound by the following terms and conditions.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Service</h2>
            <p className="mb-4">
                You agree not to misuse our services or attempt to disrupt the platform. Coupons shared must be accurate and lawful.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. User Content</h2>
            <p className="mb-4">
                You are responsible for the content you post. We reserve the right to remove any content that violates our policies.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Account Responsibility</h2>
            <p className="mb-4">
                You are responsible for maintaining the confidentiality of your account and password.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Changes to Terms</h2>
            <p className="mb-4">
                We may update these terms from time to time. Continued use of the service constitutes acceptance of the new terms.
            </p>

            <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">Last updated: April 9, 2025</p>
        </div>
    );
}

export default TermsAndConditions;
