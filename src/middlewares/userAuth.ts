import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      res.status(400).json({ message: "Please login again" });
      return;
    }
    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET!);
    const { _id } = decodedMessage as { _id: string };
    const user = await User.findById(_id);
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }
    req.user = user as IUser;
    next();
  } catch (error) {
    // console.error("Auth Middleware Error:", error);
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};
