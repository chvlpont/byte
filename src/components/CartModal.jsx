import React from "react";
import "./CartModal.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/CartSlice";

const CartModal = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  // Total price
  let totalPrice = 0;

  // Use forEach loop to calculate total price
  cartItems.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  const handleAddItem = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveItem = (product) => {
    console.log(product);
    dispatch(removeFromCart({ id: product.id }));
  };

  return (
    <div>
      <div className="cart-modal-container">
        {cartItems.map((product, index) => (
          <div className="cart-card" key={index}>
            <div className="cart-card-content">
              <div className="cart-card-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="cart-card-text">
                <div className="card-product-name">{product.name}</div>
                <div className="card-product-price">{product.price} kr</div>
                <div className="card-quantity">
                  Quantity: {product.quantity}
                </div>
                <div className="card-add-remove-buttons">
                  <button onClick={() => handleAddItem(product)}>Add</button>
                  <button onClick={() => handleRemoveItem(product)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="cart-modal-bottom">
          <div className="cart-modal-total-price">
            <p>Total: {totalPrice} kr</p>
          </div>
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
