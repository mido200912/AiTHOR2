import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET||"fa7b3bb0a8bb654007d89fd5209427bd202164b0287c775c760f627d464ee143142771e793bdd2b7f0e1b56bab872e09203ba11278abe36053a878ae51bb575f");
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ error: "Invalid token" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
