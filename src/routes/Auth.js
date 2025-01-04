import { Router } from "express";
import { generateAuthLink } from "../controller/Auth.js";

const authRouter = Router();

authRouter.post("/generate-link",generateAuthLink);
export default authRouter;