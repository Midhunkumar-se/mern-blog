import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await User.create({ ...req.body });
    res.json({ message: "Signup successful" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
