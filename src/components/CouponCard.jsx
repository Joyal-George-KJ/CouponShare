import React, { useState } from "react";
import { Clipboard, ExternalLink, Heart } from "lucide-react"; // Icons

function Card({
    title,
    description,
    tags,
    code,
    redirect,
    userName,
    userImg,
    uid,
}) {
    const [copied, setCopied] = useState(false);

    const copyCode = async () => {
        if (!code) return;
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="flex flex-col p-5 bg-neutral-800 text-white rounded-lg shadow-md shadow-neutral-900 h-fit w-full max-w-md transition hover:scale-105 hover:bg-neutral-700">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-600 text-xs px-2 py-1 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Title & Description */}
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-neutral-300 mt-1">{description}</p>

            {/* Code Section (if available) */}
            {code && (
                <div className="flex items-center bg-neutral-800 p-2 rounded mt-3">
                    <code className="text-green-400 flex-1">{code}</code>
                    <button
                        onClick={copyCode}
                        className="ml-2 text-gray-400 hover:text-green-400"
                    >
                        <Clipboard size={18} />
                    </button>
                </div>
            )}

            {/* Redirect Button (if available) */}
            {redirect && (
                <a
                    href={redirect}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 mt-3 bg-neutral-800  text-white py-2 px-4 rounded transition"
                >
                    <code className="w-3/4 line-clamp-1">{redirect}</code>
                    <ExternalLink size={18} /> 
                </a>
            )}

            {/* User Profile Section */}
            <div className="flex items-center justify-between gap-3 mt-4 border-t border-neutral-700 pt-3">
                <div className="flex gap-3 justify-center items-center">
                    <img
                        src={userImg}
                        alt={userName}
                        className="w-10 h-10 rounded-full"
                    />
                    <p className="text-sm font-medium">{userName}</p>
                </div>
                {/* Donation Button */}
                <button className="flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
                    <Heart size={18} />
                </button>
            </div>

            {/* Copied notification */}
            {copied && (
                <div className="absolute bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow">
                    Code Copied!
                </div>
            )}
        </div>
    );
}

export default Card;
