import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/search_icon.png"; // Update this path based on your file structure

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`); // Navigate to search page with query parameter
    }
  };

  return (
    <div className="search-wrapper d-flex align-items-center me-3">
      <input
        type="text"
        placeholder="Search here..."
        className="form-control search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
      />
      <img
        src={searchIcon}
        alt="Search"
        className="icon search-icon"
        onClick={handleSearch} // Trigger navigation on click
        style={{ cursor: "pointer" }} // Ensure the icon looks clickable
      />
    </div>
  );
};

export default Search;
