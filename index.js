import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authRouter from "./src/routes/Auth.js";
import cartRouter from "./src/routes/Cart.js";
const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

app.use(
  "/auth",
  (req, res, next) => {

    next();
  },
  authRouter
);
app.use(cartRouter);

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
