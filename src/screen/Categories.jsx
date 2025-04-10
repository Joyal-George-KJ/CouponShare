import { useEffect, useState } from "react";
import Tags from "../components/Tags";
import AppwriteConfig from "../constants/AppwriteConf";
import TagLoader from "../components/TagLoader";

const Categories = () => {
    const [sortType, setSortType] = useState("A-Z");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let config = new AppwriteConfig(
            import.meta.env.VITE_APPWRITE_REDIRECT_URL,
            import.meta.env.VITE_APPWRITE_PROJECT_ID
        );

        const getTags = async () => {
            try {
                let res = await config.getTags();
                if (res) {
                    setCategories(res.documents);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(true);
                console.error("Failed to get categories:", error);
            }
        };
        getTags();
    }, []);

    // Sorting Function
    const sortedCategories = [...categories].sort((a, b) => {
        if (a.name && b.name && sortType === "A-Z")
            return a.name.localeCompare(b.name);
        if (a.name && b.name && sortType === "Z-A")
            return b.name.localeCompare(a.name);
        if (a.name && b.name && sortType === "Count") return b.count - a.count;
        return 0;
    });

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                    Categories
                </h1>
                {/* Sorting Options */}
                <div className="flex flex-row justify-center items-center flex-wrap gap-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg">
                    <label className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                        Sort by:
                    </label>
                    <select
                        className="p-1 bg-neutral-200 dark:bg-neutral-700 font-medium capitalize px-2 cursor-pointer text-neutral-900 dark:text-neutral-100"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="Count">Numbers (Most First)</option>
                    </select>
                </div>
            </div>

            {/* Category List */}
            <div className="mt-6 flex flex-row flex-wrap gap-4">
                {loading
                    ? [...Array(2).keys()].map((val, ind) => (
                          <TagLoader key={ind} />
                      ))
                    : sortedCategories.map((category, index) => (
                          <Tags
                              name={category.tag}
                              count={category.count}
                              key={index}
                          />
                      ))}
            </div>
        </div>
    );
};

export default Categories;
