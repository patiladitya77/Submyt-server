import validator from "validator";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxLength: 25,
    },
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    emailId: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value: string) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter a strong password");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
