import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import {
  create,
  deletePost,
  getposts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);

export default router;
