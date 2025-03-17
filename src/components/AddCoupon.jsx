import { Hand, PlusSquareIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import PasswordInput from "./PasswordInput";
import GoogleAuth from "./GoogleAuth";
import { NavLink } from "react-router-dom";

function AddCoupon() {
    const [toggle, setToggle] = useState(false);
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([""]);
    const inputRef = useRef(null);

    const handleTags = (e) => {
        setTag(e.target.value);
        if (e.key === "Enter") {

            setTags([...tags, e.target.value]);
            setTag("");
        }
    };

    const handleCoupon = async (e) => {
        e.preventDefault();
        handleTags({ key: "Enter", target: { value: tag } });
        const validateURL =
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
        const config = new AppwriteConfig(
            "https://cloud.appwrite.io/v1",
            import.meta.env.VITE_APPWRITE_PROJECT_ID
        );
        let resp;

        if (validateURL.test(code)) {
            resp = await config.createCoupon({
                title,
                description,
                tags,
                redirect: code,
            });
            console.log("Valid URL", resp);
        } else {
            resp = await config.createCoupon({
                title,
                description,
                tags,
                code,
            });
            console.log("Invalid URL", resp);
        }
        console.log("Logging in with:", {
            title,
            description,
            tag,
            tags,
            code,
        });
    };

    return (
        <div>
            <button className="cursor-pointer" onClick={() => setToggle(!toggle)}>
                <PlusSquareIcon />
            </button>
            {toggle && (
                <div className="min-h-[75dvh] flex items-center justify-center bg-neutral-800 text-white fixed top-0 left-0 right-0 bottom-0 z-50">
                    <div className="bg-neutral-800 p-8 rounded-xl shadow shadow-neutral-500 w-full max-w-md">
                        <h2 className="text-3xl font-bold text-center">
                            Add Coupon
                        </h2>

                        <form className="mt-6 space-y-4" onSubmit={handleCoupon}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 bg-neutral-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 bg-neutral-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {tags.length > 0 && <div className="flex flex-wrap gap-2">
                                {tags.map((val, ind) => (
                                    <span className="px-2 py-1 rounded bg-neutral-700 " onClick={() => {
                                        setTags(tags.filter((tag, index) => index !== ind));
                                    }} key={ind}>{val}</span>
                                ))}
                            </div>}
                            <input
                                type="text"
                                placeholder="Tags"
                                ref={inputRef}
                                value={tag}
                                onKeyDown={handleTags}
                                onChange={(e) => setTag(e.target.value)}
                                className="w-full p-3 bg-neutral-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="URL/Code"
                                ref={inputRef}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full p-3 bg-neutral-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    className="w-full border text-red-500 hover:text-white border-red-500 py-3 rounded-lg text-lg font-medium hover:bg-red-600 transition-all cursor-pointer"
                                    onClick={() => setToggle(!toggle)}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-all cursor-pointer"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddCoupon;
