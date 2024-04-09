const sendMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Missing required fields: name, email, message" });
  }

  return res.status(200).json({ name, email, message });
};

export { sendMessage };
