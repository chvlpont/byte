import "./ProductSidebar.css";

import React from "react";

const ProductSideBar = ({ onFilterClick }) => {
  return (
    <div className="category-container">
      <h1 className="category-title">Category</h1>
      <div className="category-list">
        <ul>
          <li onClick={() => onFilterClick("")}>All Products</li>
          <li onClick={() => onFilterClick("laptop")}>Laptop</li>
          <li onClick={() => onFilterClick("mobiltelefoner")}>Phone</li>
          <li onClick={() => onFilterClick("dammsugare")}>Vacuum</li>
          <li onClick={() => onFilterClick("TV")}>TV</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductSideBar;
