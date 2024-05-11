import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import ForbiddenError from "../errors/forbidden.js";
import BadRequestError from "../errors/bad-request.js";

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      throw new ForbiddenError("You are not allowed to update this user");
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        throw new BadRequestError("Password must be at least 6 characters");
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
      if (req.body.username.length < 4 || req.body.username.length > 20) {
        throw new BadRequestError(
          "Username must be between 4 and 20 characters"
        );
      }
      if (req.body.username.includes(" ")) {
        throw new BadRequestError("Username cannot contain spaces");
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        throw new BadRequestError("Username must be lowercase");
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        throw new BadRequestError(
          "Username can only contain letters and numbers"
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
