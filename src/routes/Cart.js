import { Router } from "express";
import { addToCart, cartItems, deleteFromCart } from "../controller/CartController.js";

const cartRouter = Router();

cartRouter.post("/addToCart", addToCart);

cartRouter.post("/deleteFromCart",deleteFromCart);

cartRouter.get("/cartItems",cartItems);

export default cartRouter;