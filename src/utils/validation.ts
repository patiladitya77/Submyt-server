import validator from "validator";
import { IUpdateForm } from "./types";

export const validateSignUpdata = (req: any) => {
  const { username, emailId, password, name } = req.body;
  if (!username || !name) {
    throw new Error("Name cannot be empty");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is invalid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

export const validateEditFormData = (body: IUpdateForm) => {
  const allowedUpdates = ["title", "description", "fields"];
  const isUpdateValid = Object.keys(body).every((field) =>
    allowedUpdates.includes(field)
  );
  return isUpdateValid;
};
