import mongoose from "mongoose";
const cartScheme = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  price: {
    type: "double",
    required: true,
  },
  rating: {
    type:  "double",
    required: false,
  },
  stock: {
    type:  "double",
    required: false,
  },
});

const cartModel = mongoose.model("Cart", cartScheme);

export default cartModel;
