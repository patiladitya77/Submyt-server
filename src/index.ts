import express from "express";
import connectDB from "./config/database";
import authRouter from "./routes/authRoutes";
import dotenv from "dotenv";
import formRouter from "./routes/formRouter";
import cookieParser from "cookie-parser";
import submitRouter from "./routes/submitRouter";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/form", formRouter);
app.use("/api/form", formRouter);
app.use("/api/submit", submitRouter);

connectDB().then(() => {
  console.log("Connection established");
  app.listen(process.env.PORT, () => {
    console.log("Server running on port 7777");
  });
});
