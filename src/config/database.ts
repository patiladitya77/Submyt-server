import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://adpatil587:adityaPATIL@cluster0.7encg.mongodb.net/submyt-db"
  );
  console.log("Connection with DB established");
};

export default connectDB;
