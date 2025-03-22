import { SearchIcon } from "lucide-react";
import React from "react";

function SearchBar() {
    return (
        <form className="flex justify-between items-center max-w-md mx-auto mr-4">
            {/* Search Type Selector */}
            <label htmlFor="searchSelector" className="sr-only">
                Search by
            </label>
            <select
                id="searchSelector"
                name="searchSelector"
                className="text-neutral-200 border border-neutral-600 bg-neutral-800 p-2 rounded-l-md outline-0"
            >
                <option value="all">All</option>
                <option value="name">Name</option>
                <option value="tag">Tag</option>
            </select>

            {/* Search Input */}
            <label htmlFor="searchInput" className="sr-only">
                Search
            </label>
            <input
                id="searchInput"
                type="text"
                placeholder="Search..."
                className="outline-0 bg-neutral-800 border border-neutral-600 caret-neutral-200 pl-4 py-2 w-full text-neutral-200 placeholder-neutral-400"
            />

            {/* Search Button */}
            <button
                type="submit"
                className="bg-neutral-700 border border-neutral-600 text-neutral-200 p-2 rounded-r-md hover:bg-neutral-600 transition"
                aria-label="Search"
            >
                <SearchIcon className="text-neutral-200" />
            </button>
        </form>
    );
}

export default SearchBar;
