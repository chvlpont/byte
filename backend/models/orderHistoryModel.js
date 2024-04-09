import Order from "../schemas/orderSchema.js";

// Get order history for the authenticated user
const getOrderHistory = async (req, res) => {
  try {
    // Retrieve user ID from the request
    const userId = req.userId;

    // Query the database for orders associated with the user ID
    const orderHistory = await Order.find({ user: userId })
      .populate("products.productId")
      .exec();

    console.log("Order History:", orderHistory);

    // Return the order history as a response
    res.status(200).json({ orderHistory });
  } catch (error) {
    console.error("Failed to fetch order history:", error);
    res.status(500).json({ error: "Failed to fetch order history" });
  }
};

export { getOrderHistory };
