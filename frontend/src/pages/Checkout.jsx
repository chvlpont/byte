import CartModal from "../components/CartModal";
import { addToCart, removeFromCart, clearCart } from "../redux/CartSlice";
import "./Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import OrderCompletion from "../components/OrderCompletion";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  console.log("Cart Items:", cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalPrice = 0;
  cartItems.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  // Adding items from the cart
  const handleAddItem = (product) => {
    dispatch(addToCart(product));
  };

  // Removing items from the cart
  const handleRemoveItem = (product) => {
    console.log(product);
    dispatch(removeFromCart({ id: product.id }));
  };

  // Complete order
  const completeOrder = OrderCompletion();
  const handleCompleteOrder = async () => {
    try {
      const products = cartItems.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      }));

      await completeOrder(products);

      dispatch(clearCart());

      navigate("/order-completed");
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left-side">
        <div className="checkout-header">
          <h1>Bag</h1>
          {cartItems.length <= 0 && (
            <div className="empty-bag">
              <p className="empty-text">Cart is empty please add a product</p>
              <Link to="/products" className="empty-products">
                Products
              </Link>
            </div>
          )}
        </div>
        {cartItems.map((product, index) => (
          <div className="checkout-product-card" key={index}>
            {/* Render your cart item details here */}
            <div className="checkout-product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="checkout-product-information">
              <div className="checkout-product-name">{product.name}</div>
              <div className="item-price">{product.price} kr</div>
              <div className="checkout-quantity">
                Quantity: {product.quantity}
              </div>
              <div className="checkout-buttons">
                <div className="cart-increase-button">
                  <button onClick={() => handleAddItem(product)}>Add</button>
                </div>
                <div className="cart-remove-button">
                  <button onClick={() => handleRemoveItem(product)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length >= 1 && (
        <div className="checkout-right-side">
          <h2 className="summary">Summary</h2>
          <div className="promo-code">
            <p className="promo-title">Do you have a promo code?</p>
            <form className="promo-form">
              <input type="text" className="promo-input" />
              <button type="submit" className="promo-button">
                Apply
              </button>
            </form>
          </div>
          <div className="checkout-total-price">
            <p>Total</p>
            <p>{totalPrice} kr</p>
          </div>
          <div className="checkout-button">
            <button onClick={handleCompleteOrder}>COMPLETE ORDER</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
