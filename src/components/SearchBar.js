import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.trim()); // send query to parent
  };

  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <input
        type="text"
        placeholder="Search employee by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
