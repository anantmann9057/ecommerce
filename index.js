import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { errorHandler } from "./src/middlewares/error.js";
dotenv.config();
import cors from "cors";
import authRouter from "./src/routes/Auth.js";
import cartRouter from "./src/routes/Cart.js";

import { dbConnect } from "./src/db/index.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

dbConnect();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json());

app.use(
  "/auth",
  (req, res, next) => {
    next();
  },
  authRouter
);
app.use(errorHandler);
app.use(cartRouter);

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(3000, () => {
  console.log(`listening on ${3000}`);
});
