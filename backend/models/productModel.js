import Product from "../schemas/productSchema.js";

// Function to add a new product
export const addProduct = (req, res) => {
  const { name, description, price, category, images } = req.body;

  if (!name || !description || !price || !category || !images) {
    res.status(400).json({
      message: "You need to enter all the fields.",
    });
    return;
  }
  Product.create({ name, description, price, category, images })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong when creating the product.",
        err: err.message,
      });
    });
};

// Function to retrieve all products
export const getAllProducts = (req, res) => {
  Product.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong when fetching all products.",
      });
    });
};

// Function to retrieve a single product by ID
export const getOneProduct = (req, res) => {
  Product.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: "Could not find product with that id.",
        });
        return;
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong when fetching the product.",
        err: err.message,
      });
    });
};

// Function to update product price
export const updateProductPrice = (req, res) => {
  const { name, price, description, category, images } = req.body;
  if (!price) {
    res.status(400).json({
      message: "You need to enter a new price.",
    });
    return;
  }
  Product.findByIdAndUpdate(
    req.params.id,
    { price, name, description, category, images },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: "That id does not correspond to any existing product.",
        });
        return;
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong when updating product price.",
        err: err.message,
      });
    });
};

// Function to remove a product by ID
export const removeProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: "Could not find that product.",
        });
      }
      res.status(200).json({ id: data._id });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong when updating product price.",
        err: err.message,
      });
    });
};
