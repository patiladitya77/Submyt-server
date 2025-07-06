import mongoose from "mongoose";

const connectDB = async () => {
  const mongourl = process.env.MONGODB_URL;
  if (!mongourl) {
    throw new Error("Cannot connect to DB");
  }
  await mongoose.connect(process.env.MONGODB_URL!);
  console.log("Connection with DB established");
};

export default connectDB;
