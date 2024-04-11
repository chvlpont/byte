// Middleware function for sending a message
const sendMessage = (req, res) => {
  // Destructuring request body to extract name, email, and message
  const { name, email, message } = req.body;

  // Checking if any of the required fields are missing
  if (!name || !email || !message) {
    // If any required field is missing, return a 400 Bad Request status with an error message
    return res
      .status(400)
      .json({ error: "Missing required fields: name, email, message" });
  }

  // If all required fields are present, return a 200 OK status with the message details
  return res.status(200).json({ name, email, message });
};

export { sendMessage };
