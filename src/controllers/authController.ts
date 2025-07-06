import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { validateSignUpdata } from "../utils/validation";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { username, emailId, name, password } = req.body;
    validateSignUpdata(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      name: name,
      emailId: emailId,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    const token = savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 3600000),
    });
    res.json({ message: "Sign up successfull", savedUser });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User does not exists");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 3600000),
      });
      res.json({ message: "Login successfull", user });
    } else {
      res.json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.json({ message: "Logout successfull" });
};
