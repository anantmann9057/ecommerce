import { Router } from "express";
import { sendProfileInfo,verifyAuthToken,logoutUser,generateAuthLink } from "../controller/Auth.js";
import { isAuth } from "../middlewares/Auth.js";

const authRouter = Router();

authRouter.post("/generate-link",generateAuthLink);
authRouter.get('/verify',verifyAuthToken);
authRouter.get('/profile',isAuth,sendProfileInfo);
authRouter.post('/logout',isAuth,logoutUser);
export default authRouter;