import ForbiddenError from "../errors/forbidden.js";
import BadRequestError from "../errors/bad-request.js";
import Post from "../models/post.model.js";

export const create = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw new ForbiddenError("You are not allowed to create a post");
    }

    if (!req.body.title || !req.body.content) {
      throw new BadRequestError("Please provide all request fields");
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
