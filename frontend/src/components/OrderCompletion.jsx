// OrderCompletion.js
import { useAuth } from "../auth/AuthContext";

const OrderCompletion = () => {
  const { token } = useAuth();

  const completeOrder = async (products) => {
    try {
      const response = await fetch(
        "https://js2-ecommerce-api.vercel.app/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ products }),
        }
      );

      const responseData = await response.json();

      if (response.status === 201) {
        console.log("Order created successfully", responseData.order);
        // Additional logic or state update if needed
      } else if (response.status === 400) {
        console.error("Bad Request: All fields may not be correctly filled");
      } else {
        console.error("Failed to complete order");
      }
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  return completeOrder;
};

export default OrderCompletion;
