import express from "express";
import connectDB from "./config/database";
const app = express();
app.use(express.json());

connectDB().then(() => {
  console.log("Connection established");
  app.listen(7777, () => {
    console.log("Server running on port 7777");
  });
});
