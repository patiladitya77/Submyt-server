import express from "express";
import connectDB from "./config/database";
import authRouter from "./routes/authRoutes";
import dotenv from "dotenv";
import formRouter from "./routes/formRouter";
import cookieParser from "cookie-parser";
import submitRouter from "./routes/submitRouter";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow sending of cookies/authentication headers
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.use("/api/auth", authRouter);
app.use("/api/form", formRouter);
app.use("/api/submit", submitRouter);

connectDB().then(() => {
  console.log("Connection established");
  app.listen(process.env.PORT, () => {
    console.log("Server running on port 7777");
  });
});
