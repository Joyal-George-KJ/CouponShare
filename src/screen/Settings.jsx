import React, { useState } from "react";

function Settings() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="min-h-fit bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white px-6">
            <h1 className="text-xl font-bold mb-6">Settings</h1>

            <div className="space-y-2">
                {/* Appearance */}
                <div className="bg-neutral-100 dark:bg-neutral-800 mb-8 rounded-lg shadow">
                    <h2 className="text-base font-semibold mb-2">Appearance</h2>
                    <div className="flex items-center justify-between">
                        <span>Enable Dark Mode</span>
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            className="w-5 h-5"
                        />
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-neutral-100 dark:bg-neutral-800 mb-8 rounded-lg shadow">
                    <h2 className="text-base font-semibold mb-2">Notifications</h2>
                    <div className="flex items-center justify-between">
                        <span>Email Alerts for New Coupons</span>
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                            className="w-5 h-5"
                        />
                    </div>
                </div>

                {/* Account Actions */}
                <div className="bg-neutral-100 dark:bg-neutral-800 mb-8 rounded-lg shadow">
                    <h2 className="text-base font-semibold mb-2">Account</h2>
                    <button className="text-red-500 hover:underline">Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;