import React, { useEffect, useState } from "react";
import CouponCard from "../components/CouponCard";
import AddCoupon from "../components/AddCoupon";
import AppwriteConfig from "../constants/AppwriteConf";

function Stores() {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        fetchCoupons();
    }, [])

    const fetchCoupons = async () => {

        try {
            const res = await Auth.getCoupons();
            setLoading(false);
            setCoupons(res.documents);
            console.log(res.documents);
        } catch (error) {
            setLoading(true);
            console.error("Failed to get coupons:", error);
        }

    };

    return (
        <>
            <div className="flex justify-between p-2 mb-4">
                <h3 className="text-lg font-medium">Coupons</h3>
                <AddCoupon />
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
