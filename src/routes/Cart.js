import { Router } from "express";
import { addToCart, cartItems, deleteFromCart, getCartItems, insertIntoCart } from "../controller/CartController.js";

const cartRouter = Router();

cartRouter.post("/addToCart", addToCart);

cartRouter.post("/deleteFromCart",deleteFromCart);

cartRouter.get("/cartItems",cartItems);

cartRouter.get('/getCartItems',getCartItems)

cartRouter.post('/insertIntoCart',insertIntoCart)


export default cartRouter;