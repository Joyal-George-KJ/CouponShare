import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AppwriteConfig from "../constants/AppwriteConf";

function Verify() {
    useEffect(() => {
        let result = new URLSearchParams(window.location.search);

        const Auth = new AppwriteConfig(
            "https://cloud.appwrite.io/v1",
            "67c6a635003603605fbc"
        );

        Auth.updateUserVerification({
            uid: result.get("userId"),
            code: result.get("secret"),
        });
    });

    return <div>Verify</div>;
}

export default Verify;
