import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Loading environment variables from .env file

const PORT = process.env.PORT || 8080; // Setting the port for the server
const mongoURI = process.env.MONGO_URI; // Getting the MongoDB URI

// Starting the Express server
app.listen(PORT, () =>
  console.log(`Server running at: http://localhost:${PORT}`)
);

// Connecting to MongoDB database
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Connection error:", err));
