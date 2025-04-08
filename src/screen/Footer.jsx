function Footer() {
    return (
        <footer className="w-full bg-neutral-900 text-neutral-400 text-sm py-6 px-6 flex flex-col items-center">
            <div className="max-w-4xl w-full flex flex-col sm:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} CouponShare. All rights reserved.</p>
                <div className="flex gap-4 mt-2 sm:mt-0">
                    <a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a>
                    <a href="/terms" className="hover:text-white transition">Terms of Use</a>
                    <a href="mailto:support@couponshare.com" className="hover:text-white transition">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
