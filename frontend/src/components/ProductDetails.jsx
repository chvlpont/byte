import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import CartModal from "./CartModal";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalVisible, setModalVisibility] = useState(false);
  const dispatch = useDispatch();

  //Render CartModal
  const handleShowModal = () => {
    setModalVisibility(true);
    setTimeout(() => {
      handleCloseModal();
    }, 6000);
  };

  const handleCloseModal = () => {
    setModalVisibility(false);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:9999/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log("Error fetching product", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Render product details conditionally
  return (
    <div className="product-details-container">
      {product ? (
        <>
          <div className="product-details-section">
            <div className="product-details-image">
              <img src={product.images[0]} />
            </div>
            <div className="product-details-card">
              <h2 className="product-details-name">{product.name}</h2>
              <p className="product-details-description">
                {product.description}
              </p>
              <p className="product-details-price">{product.price} kr</p>
              <div className="product-details-button">
                <button
                  onClick={() => {
                    const { _id, name, images, price } = product;
                    const newItem = {
                      id: _id,
                      name: name,
                      image: images[0],
                      price: price,
                    };

                    dispatch(addToCart(newItem));
                    handleShowModal();
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          {/* Render the CartModal */}
          {isModalVisible && <CartModal onClose={handleCloseModal} />}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
