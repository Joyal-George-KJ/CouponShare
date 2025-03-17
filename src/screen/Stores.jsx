import React, { useEffect, useState } from "react";
import CouponCard from "../components/CouponCard";
import AddCoupon from "../components/AddCoupon";
import AppwriteConfig from "../constants/AppwriteConf";

function Stores() {
    const [toggleCode, setToggleCode] = useState(false);
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        fetchCoupons();
    }, [])

    const fetchCoupons = async () => {
        const Auth = new AppwriteConfig(
            "https://cloud.appwrite.io/v1",
            import.meta.env.VITE_APPWRITE_PROJECT_ID
        );

        const res = await Auth.getCoupons();

        setCoupons(res.documents);
        console.log(res.documents);
    };

    return (
        <>
            <div className="flex justify-between p-2 mb-4">
                <h3 className="text-lg font-medium">Coupons</h3>
                <AddCoupon />
            </div>
            <div className="grid laptop:grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2 gap-4">
                <CouponCard
                    tags={["Amazon", "15% Discount"]}
                    code={23423}
                    description={
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis et distinctio numquam, a ab debitis impedit dolor eaque nam fugit, iusto saepe nemo tenetur delectus!"
                    }
                    expiryDate={"20/2/2026"}
                    title={"15% Discount on every purchase above 299rs"}
                />
                <CouponCard
                    tags={["Amazon"]}
                    code={23423}
                    description={
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis et distinctio numquam, a ab debitis impedit dolor eaque nam fugit, iusto saepe nemo tenetur delectus!"
                    }
                    expiryDate={"20/2/2026"}
                    title={"15% Discount on every purchase above 299rs"}
                />
                <CouponCard
                    tags={["Amazon"]}
                    code={23423}
                    description={
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis et distinctio numquam, a ab debitis impedit dolor eaque nam fugit, iusto saepe nemo tenetur delectus!"
                    }
                    expiryDate={"20/2/2026"}
                    title={"15% Discount on every purchase above 299rs"}
                />
                <CouponCard
                    tags={["Amazon"]}
                    code={23423}
                    description={
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis et distinctio numquam, a ab debitis impedit dolor eaque nam fugit, iusto saepe nemo tenetur delectus!"
                    }
                    expiryDate={"20/2/2026"}
                    title={"15% Discount on every purchase above 299rs"}
                />
                {
                    coupons.map((val, ind) => <CouponCard key={ind} {...val} />)
                }
            </div>
        </>
    );
}

export default Stores;
