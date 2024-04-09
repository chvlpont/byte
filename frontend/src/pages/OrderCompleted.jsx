import "./OrderCompleted.css";

const OrderCompleted = () => {
  return (
    <div className="order-completed-container">
      <div className="order-completed-title">
        <h1>Thank you!</h1>
      </div>
      <div className="order-completed-undertitle">
        <h2>Your order was completed successfully.</h2>
      </div>
      <div className="order-completed-mail">
        <p>
          We are getting started on your order right away, and you will receive
          an order confirmation email shortly.
        </p>
      </div>
      <div>
        <i className="fa-solid fa-check"></i>
      </div>
    </div>
  );
};

export default OrderCompleted;
