import { Router } from "express";
import { generateAuthLink } from "../controller/Auth.js";
import { verifyAuthToken } from "../controller/Auth.js";

const authRouter = Router();

authRouter.post("/generate-link",generateAuthLink);
authRouter.post('/verify',verifyAuthToken);
export default authRouter;