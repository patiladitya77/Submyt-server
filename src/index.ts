import express from "express";
import connectDB from "./config/database";
import authRouter from "./routes/authRoutes";
const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

connectDB().then(() => {
  console.log("Connection established");
  app.listen(7777, () => {
    console.log("Server running on port 7777");
  });
});
