import React, { useEffect, useState } from "react";
import CouponCard from "../components/CouponCard";
import AddCoupon from "../components/AddCoupon";
import AppwriteConfig from "../constants/AppwriteConf";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CouponLoader from "../components/CouponLoader";
import SearchBar from "../components/SearchBar";

function Stores() {
    const { key, value } = useParams();
    const user = useSelector((state) => state.user.user);
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const Auth = new AppwriteConfig(
        import.meta.env.VITE_APPWRITE_REDIRECT_URL,
        import.meta.env.VITE_APPWRITE_PROJECT_ID
    );

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const res = await Auth.getCoupons(key, value);
            setLoading(false);
            setCoupons(res.documents);
        } catch (error) {
            setLoading(true);
            console.error("Failed to get coupons:", error);
        }
    };

    return (
        <>
            <div className="flex justify-between py-2 mb-4">
                {user ? <AddCoupon /> : <SearchBar />}
            </div>
            <div className="grid laptop:grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2 gap-4">
                {loading
                    ? [...Array(6).keys()].map((val, ind) => (
                          <CouponLoader key={ind} />
                      ))
                    : coupons.map((val, ind) => (
                          <CouponCard key={ind} {...val} />
                      ))}
            </div>
        </>
    );
}

export default Stores;
