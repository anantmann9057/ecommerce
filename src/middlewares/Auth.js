import {  sendErrorMessage } from "../utils/helper.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";
export const isAuth = async (req, res, next) => {
  const authToken = req.cookies.authToken;
  if (!authToken) {
    return sendErrorMessage(res, "unauthorised", 401);
  }
  try {
    const payload = jwt.verify(
      authToken,
      "41525779dcec5ff8bbaede4cf3843b03587d"
    );
    let user = await UserModel.findById(payload.userId);
    if (!user) {
      return sendErrorMessage({
        res: res,
        message: "Unauthorised user not found!",
        staus: 401,
      });
    }
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export const isGoogleAuth = async (req, res, next) => {
  const authToken = req.cookies.access_token;
  if (!authToken) {
    return sendErrorMessage(res, "unauthorised", 401);
  }
  try {
    const payload = jwt.verify(
      authToken,
      "41525779dcec5ff8bbaede4cf3843b03587d"
    );
    let user = await UserModel.findById(payload.userId);
    if (!user) {
      return sendErrorMessage({
        res: res,
        message: "Unauthorised user not found!",
        staus: 401,
      });
    }
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};