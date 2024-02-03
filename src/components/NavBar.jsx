import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useSelector } from "react-redux";
import CartModal from "./CartModal";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

const NavBar = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { token, logout } = useAuth();

  const openCartModal = () => {
    setIsCartModalOpen(true);

    // Automatically close the cart modal after 10 seconds
    setTimeout(() => {
      setIsCartModalOpen(false);
    }, 10000);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleLogout = () => {
    // Call the logout function from the AuthContext
    logout();
  };

  return (
    <nav className="navbar-container">
      <li>
        <Link to="/" className="navbar-brandname">
          BYTE
        </Link>
      </li>
      <div className="navbar-links">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      <li className="icons">
        <div onClick={openCartModal} to="/cart" className="cart-link">
          <i className="fa-solid fa-cart-shopping" />
          <span className="cart-counter">
            Cart (
            {cartItems.reduce((total, product) => total + product.quantity, 0)})
          </span>
        </div>
        {token ? (
          //   {/* Render content when user is logged in */}

          <div className="user-container">
            <i className="fa-regular fa-user"></i>
            <div className="hovered-user-div">
              <div
                className="hovered-logout"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                <p>Log out</p>
              </div>

              <Link to="/orders">View Orders</Link>
            </div>
          </div>
        ) : (
          <div className="user-container">
            <i className="fa-regular fa-user"></i>
            <div className="hovered-user-div">
              <Link to="/login">Log in</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
        )}
      </li>
      {isCartModalOpen && <CartModal onClose={closeCartModal} />}
    </nav>
  );
};

export default NavBar;
