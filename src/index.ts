import express from "express";
import connectDB from "./config/database";
import authRouter from "./routes/authRoutes";
import dotenv from "dotenv";
import formRouter from "./routes/formRouter";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/form", formRouter);

connectDB().then(() => {
  console.log("Connection established");
  app.listen(process.env.PORT, () => {
    console.log("Server running on port 7777");
  });
});
