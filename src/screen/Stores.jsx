import React, { useState } from "react";
import CouponCard from "../components/CouponCard";

function Stores() {
    const [toggleCode, setToggleCode] = useState(false);

    return (
        <div className="flex flex-row flex-wrap gap-4 pt-4">
            <CouponCard tags={["Amazon", "15% Discount"]} code={23423} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis et distinctio numquam, a ab debitis impedit dolor eaque nam fugit, iusto saepe nemo tenetur delectus!"} expiryDate={"20/2/2026"} title={"15% Discount on every purchase above 299rs"}  />
            <CouponCard tags={["Amazon"]} code={23423} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis et distinctio numquam, a ab debitis impedit dolor eaque nam fugit, iusto saepe nemo tenetur delectus!"} expiryDate={"20/2/2026"} title={"15% Discount on every purchase above 299rs"}  />
            <CouponCard tags={["Amazon"]} code={23423} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis et distinctio numquam, a ab debitis impedit dolor eaque nam fugit, iusto saepe nemo tenetur delectus!"} expiryDate={"20/2/2026"} title={"15% Discount on every purchase above 299rs"}  />
            <CouponCard tags={["Amazon"]} code={23423} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis et distinctio numquam, a ab debitis impedit dolor eaque nam fugit, iusto saepe nemo tenetur delectus!"} expiryDate={"20/2/2026"} title={"15% Discount on every purchase above 299rs"}  />
        </div>
    );
}

export default Stores;
