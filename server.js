import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import companyRoutes from "./routes/Company.js"; // ✅ اسم الملف الصحيح
import publicCompanyChat from "./routes/publicCompanyChat.js";


dotenv.config();
const app = express();

// CORS: فقط للفرونت اند
app.use(cors({
  origin: "https://aithor2.vercel.app", // ضع هنا URL الفرونت اند أو قائمة إذا كان متعدد
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/public", publicCompanyChat);
mongoose
  .connect(process.env.MONGO_URI||"mongodb+srv://aismart:mido927010@cluster0.k3yeysv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Aithor API is running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
