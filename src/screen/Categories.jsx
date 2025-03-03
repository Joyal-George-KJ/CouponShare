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
    <div>Categories</div>
  )
}

export default Categories