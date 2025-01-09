// import pg from "pg";
import cartModel from "../models/Cart.js";
// const client = new pg.Client({
//   user: "postgres",
//   password: "123456",
//   host: "localhost",
//   port: 5432,
//   database: "products",
// });
// client.connect();


export const getCartItems = async (req, res) => {
  let cart = await cartModel.find();
  if (!cart) {
    res.json({
      data: [],
      message: "no cart Items!",
      status: 0,
    });
  }
  res.json({
    data: cart,
    status: 1,
    message: "cart fetched successfully",
  });
};
export const insertIntoCart = async (req, res) => {
  console.log(req.body);
  let cart = await cartModel.findOne({ id: req.query.id });
  if (!cart) {
    cart = await cartModel.create({
      id: req.query.id,
      title: req.query.title,
      description: req.query.description,
      thumbnail: req.query.thumbnail,
      category: req.query.category,
      price: req.query.price,
      rating: req.query.rating,
      stock: req.query.stock,
    });
  }
  res.json({
    data: {},
    status: 1,
    message: "item added successfully!",
  });
};

export const deleteFromCart = async (req, res) => {
  let cart = await cartModel.findOneAndDelete({ id: req.query.id });
  if (!cart) {
    res.json({
      data: {},
      status: 0,
      message: "unable to delete item!",
    });
  }
  res.json({
    data: {},
    status: 1,
    message: "item deleted successfully!",
  });
};
