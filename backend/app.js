import express from "express";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

// Import controllers
import messageController from "./controllers/messageController.js";
import productController from "./controllers/productController.js";
import userController from "./controllers/userController.js";
import orderController from "./controllers/orderController.js";
import orderHistoryController from "./controllers/orderHistoryController.js";

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: false }));

// Routes for handling messages
app.use("/api/messages", messageController);

// Routes for handling products
app.use("/api/products", productController);

// Routes for handling user registration and login
app.use("/api/users", userController);

// Routes for handling orders such as saving order to database
app.use("/api/orders", orderController);

// Routes for handling order history
app.use("/api/order-history", orderHistoryController);

// Error handling middleware
app.use(notFound); // Catch 404 errors
app.use(errorHandler); // Error handler

export default app;
