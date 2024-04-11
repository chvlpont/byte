import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Defining the schema for messages
const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Message = model("Message", messageSchema);

export default Message;
