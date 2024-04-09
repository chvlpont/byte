import Order from "../schemas/orderSchema.js";

const saveOrder = async (req, res) => {
  const { products } = req.body;
  const userId = req.userId;

  try {
    const newOrder = new Order({
      user: userId,
      products: products,
    });

    // Save the order first
    const savedOrder = await newOrder.save();

    // After saving, you can then populate and return the populated document.
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("products.productId")
      .exec();

    res
      .status(201)
      .json({ message: "Order saved successfully", order: populatedOrder });
  } catch (error) {
    console.error("Failed to save order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
};

export { saveOrder };
