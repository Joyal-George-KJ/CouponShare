import { Info } from "lucide-react";
import React, { useState } from "react";

function PasswordInput({pattern, password, setPassword, placeholder}) {
    const [toggle, setToggle] = useState(false);
    return (
        <>
            <div className="relative">
                <input
                    type="password"
                    placeholder={placeholder}
                    pattern={pattern}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-neutral-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <Info
                    className="absolute top-3 right-3 text-neutral-300 cursor-pointer"
                    onClick={() => {
                        setToggle(true);
                        setTimeout(() => {
                            setToggle(false);
                        }, 2000);
                    }}
                />
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
