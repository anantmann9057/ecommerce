import { z } from "zod";
import VerificationTokenModel from "../models/VerificationToken.js";
import UserModel from "../models/Users.js";
import mail from "../utils/mail.js";
// const nodeMailerKey = "32fe737fcd25d73472e94a57383f1d69";

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
    let user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      user = await UserModel.create({
        email: req.body.email,
        userId: req.body.email,
      });
      res.json(user);
    }

    const userId = user._id.toString();
    await VerificationTokenModel.findOneAndDelete({
      userId: userId,
    });
    var verification = await VerificationTokenModel.create({
      userId: userId,
      token: req.body.email,
    });
    console.log(verification.token);
    const link = `http://localhost:5173/verify?token=${verification.token}`;

    await mail.sendVerificationMail({
      from: "verification@ecommerce.com", // sender address
      to: `${req.body.email}`, // list of receivers
      subject: "Hello verify your ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Click this <a href="${link}"> link to verify your account</a></b> ${req.body.email}`, // html body
    });

    res.status(200).json({
      data: {},
      status: 1,
      message:
        "A mail has been sent to your address please verify to continue!",
    });

  }
};
