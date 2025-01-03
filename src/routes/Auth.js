import { Router } from "express";
import { generateAuthLink } from "../controller/Auth.js";

const authRouter = Router();
authRouter.get('/getData',(req,res)=>{
   
})
authRouter.get("/generate-link",generateAuthLink);
export default authRouter;