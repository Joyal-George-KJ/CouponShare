import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const searchSelector = event.target.searchSelector.value;
        const searchInput = event.target.searchInput.value;
        console.log(searchSelector, searchInput);
        navigate(`/stores/${searchSelector}/${searchInput}`);
    };
    return (
        <form
            className="flex w-full justify-between items-center max-w-md mr-4"
            onSubmit={handleSubmit}
        >
            {/* Search Type Selector */}
            {width > 722 && (
                <>
                    <label htmlFor="searchSelector" className="sr-only">
                        Search by
                    </label>
                    <select
                        id="searchSelector"
                        name="searchSelector"
                        disabled
                        className="text-neutral-600 dark:text-neutral-200 appearance-none border border-neutral-400 bg-neutral-200 dark:bg-neutral-800 p-2 rounded-l-md outline-0"
                    >
                        <option value="title">Name</option>
                    </select>

                    {/* Search Input */}
                    <label htmlFor="searchInput" className="sr-only bg-neutral-200 dark:bg-neutral-800">
                        Search
                    </label>
                    <input
                        id="searchInput"
                        type="text"
                        placeholder="Search..."
                        className="outline-0 bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 caret-neutral-200 pl-4 py-2 w-full text-neutral-800 dark:text-neutral-200 placeholder-neutral-400"
                    />
                </>
            )}

            {/* Search Button */}
            <button
                type="submit"
                className={`dark:bg-neutral-700 bg-neutral-300 border border-neutral-400 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 p-2 hover:bg-neutral-400 dark:hover:bg-neutral-600 transition ${
                    width > 722 ? "rounded-r-md p-2" : "rounded-md px-4 py-2 "
                }`}
                aria-label="Search"
            >
                <SearchIcon className="text-neutral-800 dark:text-neutral-200" />
            </button>
        </form>
    );
}

export default SearchBar;
