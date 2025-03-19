import React, { useEffect, useState } from "react";
import CouponCard from "../components/CouponCard";
import AddCoupon from "../components/AddCoupon";
import AppwriteConfig from "../constants/AppwriteConf";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

function Stores() {
    const user = useSelector((state) => state.user.user);
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true)
    const Auth = new AppwriteConfig(
        "https://cloud.appwrite.io/v1",
        import.meta.env.VITE_APPWRITE_PROJECT_ID
    );

    useEffect(() => {
        fetchCoupons();
    }, [])

    const fetchCoupons = async () => {

        try {
            const res = await Auth.getCoupons();
            setLoading(false);
            setCoupons(res.documents);
        } catch (error) {
            setLoading(true);
            console.error("Failed to get coupons:", error);
        }

    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="flex justify-between p-2 mb-4">
                <h3 className="text-lg font-medium">Coupons</h3>
                {user && <AddCoupon />}
            </div>
            <div className="grid laptop:grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2 gap-4">
                {
                    coupons.map((val, ind) => <CouponCard key={ind} {...val} />)
                }
            </div>
        </>
    );
}

export default Stores;
