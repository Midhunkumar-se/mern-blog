import jwt from "jsonwebtoken";
import UnAuthenticatedError from "../errors/unauthenticated.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];
  try {
    if (!token) {
      throw new UnAuthenticatedError("Unauthorized");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
