import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./OrderHistory.css";

const OrderHistory = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Redirect to the login page if the user is not authenticated
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch order history data when the component mounts
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(
          "http://localhost:9999/api/order-history",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const orderHistoryData = await response.json();
          setOrderHistory(orderHistoryData);
        } else if (response.status === 401) {
          console.error("Unauthorized: No valid token has been sent");
        } else {
          console.error("Failed to fetch order history");
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, [token, navigate]);

  return (
    <div>
      <div className="order-history-title">
        <h2>Order History</h2>
      </div>
      <ul className="order-list">
        {orderHistory.map((order) => (
          <li key={order._id} className="order-item">
            <div className="order-info">
              <div>
                <div className="order-label">Order Number:</div>
                <div className="order-value">{order._id}</div>
              </div>
              <div>
                <div className="order-label">Number of Products:</div>
                <div className="order-value">{order.products.length}</div>
              </div>
              <div>
                <div className="order-label">Total Price:</div>
                <div className="order-value">{order.totalPrice} kr</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
