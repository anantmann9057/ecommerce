import { z } from "zod";
import VerificationTokenModel from "../models/VerificationToken.js";
import UserModel from "../models/Users.js";
const schema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export const generateAuthLink = async (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.status(403).json({ error: result.error.flatten().fieldErrors });
  } else {
    console.log(req.body.email);
    try{
        let user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
           user =  await UserModel.create({
                email:req.body.email,
                userId:req.body.email
              });
          res.json(user);
         
        }

        const userId = user._id.toString();
        await VerificationTokenModel.findOneAndDelete({
            userId:userId
        });
        await VerificationTokenModel.create({
            userId: userId,
            token:req.body.email,
          });
          res.status(200).json(result);
        }
        catch(e){
            res.json(e.message);
        }
      
        next();
  }
};
