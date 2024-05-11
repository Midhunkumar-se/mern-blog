import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/unauthenticated.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = user.createJWT();

    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const newUser = await User.create({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: generatedPassword,
        profilePicture: googlePhotoUrl,
      });
      const token = newUser.createJWT();

      const { password: pass, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
