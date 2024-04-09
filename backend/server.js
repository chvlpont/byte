import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI;

app.listen(PORT, () =>
  console.log(`Server running at: http://localhost:${PORT}`)
);

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Connection error:", err));
