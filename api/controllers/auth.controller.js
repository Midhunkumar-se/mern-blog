import BadRequestError from "../errors/bad-request.js";
import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      throw new BadRequestError("Please fill out all fields");
    }

    await User.create({ ...req.body });
    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};
