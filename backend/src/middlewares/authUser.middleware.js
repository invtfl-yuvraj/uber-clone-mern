import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import blackListTokenModel from "../models/blackListToken.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  console.log("Token", token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized user access",
    });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token });

  console.log("Blacklisted token", isBlackListed);

  if (isBlackListed) {
    return res.status(401).json({
      message: "Unauthorized user access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded._id);

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized user access",
    });
  }
};
