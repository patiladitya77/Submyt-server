import { Request, Response } from "express";
import Form from "../models/form";
import { generateSlug } from "../utils/generateSlug";
import { IUser } from "../models/User";
import { nanoid } from "nanoid";

export const createFormController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser;
    const { title, description, fields } = req.body;
    if (!title || typeof title !== "string" || title.trim() === "") {
      res.status(400).json({ message: "Title is required." });
    }

    if (!Array.isArray(fields) || fields.length === 0) {
      res.status(400).json({ message: "Form must have at least one field." });
    }

    let slug = generateSlug(title);
    console.log(slug);
    slug = slug + "-" + nanoid(5);
    const newForm = new Form({
      title: title,
      description: description,
      slug: slug,
      ownerId: user._id,
      fields: fields,
    });
    const savedForm = await newForm.save();
    res.json({ message: "Form created successfully", savedForm });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
