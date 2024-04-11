import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import "./ProductList.css";
import ProductSideBar from "../components/ProductSideBar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = "http://localhost:9999/api/products";

        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Callback function to handle product click
  const handleProductClick = (_id) => {
    console.log(`Product clicked: ${_id}`);
    setSelectedProductId(_id);
  };

  return (
    <>
      <ProductSideBar onFilterClick={setSelectedCategory} />
      <div className="product-list-container">
        <div className="product-list">
          {products
            .filter((product) => {
              if (
                !selectedCategory ||
                product.category.toLowerCase() ===
                  selectedCategory.toLowerCase()
              ) {
                return true;
              } else {
                return false;
              }
            })
            .map((product) => (
              <Link key={product._id} to={`/products/${product._id}`}>
                <div
                  className="product-card"
                  onClick={() => handleProductClick(product._id)}
                >
                  <div className="product-image">
                    <img src={product.images[0]} alt={product.name} />
                  </div>
                  <div className="product-details">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">{product.price} kr</p>
                  </div>
                </div>
              </Link>
            ))}

          {/* Render ProductDetails with selectedProductId */}
          {selectedProductId && <ProductDetails id={selectedProductId} />}
        </div>
      </div>
    </>
  );
};

export default ProductList;
