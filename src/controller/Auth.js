import { z } from "zod";
import VerificationTokenModel from "../models/VerificationToken.js";
import UserModel from "../models/Users.js";
import mail from "../utils/mail.js";
import jwt from "jsonwebtoken";
import {
  formatUserProfile,
  sendErrorMessage,
  sendSuccessResponse,
} from "../utils/helper.js";
// const nodeMailerKey = "32fe737fcd25d73472e94a57383f1d69";
const jwtKey = "41525779dcec5ff8bbaede4cf3843b03587d";
const schema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export const generateAuthLink = async (req, res, next) => {
  const result = schema.safeParse(req.body);
  console.log(req.body);
  if (!result.success) {
    res.status(403).json({ error: result.error.flatten().fieldErrors });
  } else {
    console.log(req.body.email);
    let user = await UserModel.findOne({ email: req.body.email });
    1;

    if (!user) {
      user = await UserModel.create({
        email: req.body.email,
        userId: req.body.email,
      });
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
    const link = `http://localhost:3000/auth/verify?token=${verification.token}&userId=${verification.userId}`;

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
export const verifyAuthToken = async (req, res, next) => {
  let token = req.query.token;
  console.log(token);
  var tokenEntery = await VerificationTokenModel.findOne({ token: token });
  var userModel = await UserModel.findById(tokenEntery.userId);
  if (tokenEntery) {
    const payload = { userId: tokenEntery.userId.toString() };

    var authToken = jwt.sign(payload, jwtKey, {
      expiresIn: "15d",
    });

    await VerificationTokenModel.findOneAndDelete({ token: token });
    res.cookie("authToken", authToken, {
      http: true,
      secure: false,
      sameSite: "strict",
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });
    //res.json(userModel);
    res.redirect(
      `http://localhost:5173/?profile=${JSON.stringify(
        formatUserProfile(userModel)
      )}`
    );
  } else {
    return sendErrorMessage(
      res,
      `invalid token! ${req.query.token} ${req.query.userId}`,
      403
    );
  }
};
export const updateProfile = async (req, res) => {
  let userId = req.user._id;
  const update = {
    lName: req.body.lName,
    fName: req.body.fName,
    phone: req.body.phone,
    address: req.body.address,
  };

  await UserModel.updateMany({ _id: userId }, update).then((value, err) => {
    if (err) {
      res.json(err);
    }
  });

  console.log(req.body);

  sendSuccessResponse({
    res: res,
    message: "profile updated successfully!",
    status: 200,
    data: {},
  });
};

export const sendProfileInfo = (req, res) => {
  res.json({
    profile: req.user,
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("authToken").send();
  res.end();
  sendSuccessResponse(res,"Logout Successfully",200,{});
};
