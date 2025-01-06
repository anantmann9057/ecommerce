import { Router } from "express";
import { generateAuthLink } from "../controller/Auth.js";
import { verifyAuthToken } from "../controller/Auth.js";
import { sendProfileInfo } from "../controller/Auth.js";
import { isAuth } from "../middlewares/Auth.js";

const authRouter = Router();

authRouter.post("/generate-link",generateAuthLink);
authRouter.get('/verify',verifyAuthToken);
authRouter.get('/profile',isAuth,sendProfileInfo);
export default authRouter;