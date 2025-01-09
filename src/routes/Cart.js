import { Router } from "express";
import {
  deleteFromCart,
  getCartItems,
  insertIntoCart,
} from "../controller/CartController.js";

const cartRouter = Router();

cartRouter.post("/deleteFromCart", deleteFromCart);

cartRouter.get("/getCartItems", getCartItems);

cartRouter.post("/insertIntoCart", insertIntoCart);

export default cartRouter;
