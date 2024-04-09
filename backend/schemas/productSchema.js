import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

const Product = model("Product", productSchema);

export default Product;

/* POST example
{
  "name": "Product Name",
  "price": 20.99,
  "description": "Product Description",
  "category": "Product Category",
  "images": ["image_url_1", "image_url_2"]
}
*/
