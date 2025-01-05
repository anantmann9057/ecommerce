import pg from "pg";
import cartModel from "../models/Cart.js";
const client = new pg.Client({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "products",
});
client.connect();
export const addToCart = async (req, res) => {
  console.log(req.query);
  try {
    var item = req.query;

    var cart = await client.query(
      "insert into cart( id,title,description, thumbnail, category, price, rating, stock) values($1,$2,$3,$4,$5,$6,$7,$8) returning *",
      [
        item.id,
        item.title,
        item.description,
        item.thumbnail,
        item.category,
        item.price,
        item.rating,
        item.stock,
      ]
    );
    response = {
      status: 1,
      data: cart.rows,
      message: "product added to card successfully!",
    };
    res.json(response);
  } catch (e) {
    var response = {
      status: 0,
      data: [],
      message: `${e}`,
    };
    res.json(response);
  }
};

export const cartItems = async (req, res) => {
  try {
    var response = await client.query("select * from cart").then();
    console.log(response.rows);
    res.json(response.rows);
  } catch (e) {
    res.sendStatus(500);
    res.json(e);
  }
};

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
