import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer className="w-full bg-neutral-200 dark:bg-neutral-800 border-t-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-400 text-sm py-6 px-6 flex flex-col items-center">
            <div className="max-w-4xl w-full flex flex-col sm:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} CouponShare. All rights reserved.</p>
                <div className="flex gap-4 mt-2 sm:mt-0">
                    <NavLink to="/privacy" className="hover:text-black dark:hover:text-white transition">Privacy Policy</NavLink>
                    <NavLink to="/terms" className="hover:text-black dark:hover:text-white transition">Terms of Use</NavLink>
                    <a href="mailto:support@couponshare.com" className="hover:text-black dark:hover:text-white transition">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
