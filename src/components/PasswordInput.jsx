import { EyeClosedIcon, EyeIcon, Info } from "lucide-react";
import React, { useState } from "react";

function PasswordInput({ pattern, password, setPassword, placeholder }) {
    const [toggle, setToggle] = useState(false);
    const [type, setType] = useState("password");
    const changeHandle = (e) => {
        setPassword(e.target.value);

        if (e.target.value.length < 8) {
            setToggle(true);
        } else if (pattern.test(e.target.value)) {
            setToggle(false);
        } else {
            setToggle(true);
        }
    };

    return (
        <>
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    pattern={pattern}
                    value={password}
                    onChange={changeHandle}
                    className="w-full p-3 bg-neutral-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                {type === "text" ? (
                    <EyeIcon
                        className="absolute top-3 right-3 text-neutral-300 cursor-pointer"
                        onClick={() => {
                            setType("password");
                        }}
                    />
                ) : (
                    <EyeClosedIcon
                        className="absolute top-3 right-3 text-neutral-300 cursor-pointer"
                        onClick={() => {
                            setType("text");
                        }}
                    />
                )}
            </div>
            {toggle ? (
                <p className="text-yellow-400 text-sm">
                    Password must contain <br />
                    <li>At least 8 characters</li> <li>1 uppercase letter</li>{" "}
                    <li>1 lowercase letter</li>{" "}
                    <li>1 number and 1 special character</li>
                </p>
            ) : (
                <></>
            )}
        </>
    );
}

export default PasswordInput;
