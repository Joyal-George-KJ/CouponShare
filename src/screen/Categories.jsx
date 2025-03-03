import { useState } from "react";
import Tags from "../components/Tags";

const Categories = () => {
  const [sortType, setSortType] = useState("A-Z");

  const categories = [
    { name: "Electronics", count: 25 },
    { name: "Clothing", count: 40 },
    { name: "Shoes", count: 15 },
    { name: "Books", count: 30 },
    { name: "Accessories", count: 10 },
    { name: "Toys", count: 20 },
    { name: "Watches", count: 5 },
  ];

  // Sorting Function
  const sortedCategories = [...categories].sort((a, b) => {
    if (sortType === "A-Z") return a.name.localeCompare(b.name);
    if (sortType === "Z-A") return b.name.localeCompare(a.name);
    if (sortType === "Count") return b.count - a.count;
    return 0;
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium text-neutral-100">Categories</h1>
        {/* Sorting Options */}
        <div className="flex flex-row justify-center items-center flex-wrap gap-2 bg-neutral-800 rounded-lg">
          <label className="text-base font-medium text-neutral-300">Sort by:</label>
          <select
            className="p-1 bg-neutral-700 font-medium capitalize px-2 cursor-pointer text-neutral-100"
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
        {sortedCategories.map((category, index) => (
          <Tags name={category.name} count={category.count} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
