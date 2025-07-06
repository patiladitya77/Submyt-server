import validator from "validator";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  emailId: string;
  name: string;
  password: string;
  getJWT(): string;
  validatePassword(passwordEnteredByUser: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
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
userSchema.methods.getJWT = async function () {
  const user = this;
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("Cannot get secret");
  }
  const token = await jwt.sign({ _id: user._id }, jwtSecret, {
    expiresIn: "1d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (
  passwordEnteredByUser: string
): Promise<boolean> {
  const user = this;
  const { password } = user;
  const isPasswordValid = await bcrypt.compare(passwordEnteredByUser, password);
  return isPasswordValid;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
