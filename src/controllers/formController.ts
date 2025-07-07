import { Request, Response } from "express";
import Form from "../models/form";
import { generateSlug } from "../utils/generateSlug";
import { IUser } from "../models/User";
import { nanoid } from "nanoid";
import { validateEditFormData } from "../utils/validation";

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

export const getFormsController = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    const forms = await Form.find({ ownerId: user._id }).sort({
      createdAt: -1,
    });
    res.json({ message: "Forms fetched successfully", forms });
  } catch (error) {
    res.status(400).json({ message: "Error" + error });
  }
};

export const editFormController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser;
    const formId = req.params.formId;
    const form = await Form.findById(formId);

    if (!form) {
      res.status(400).json({ message: "Form not found" });
      return;
    }
    if (form.status === "published") {
      res
        .status(400)
        .json({ message: "Cannot update form once it is published" });
      return;
    }

    if (!validateEditFormData(req.body)) {
      res.status(400).json({ message: "Cannot update these fields" });
      return;
    }

    if (req.body.title) {
      const segments = form.slug.split("-");
      const oldId = segments[segments.length - 1];

      const newSlug = generateSlug(req.body.title) + "-" + oldId;
      form.slug = newSlug;
    }

    Object.keys(req.body).forEach((key) => {
      (form as any)[key] = req.body[key];
    });

    await form.save();
    res.json({ message: form });
  } catch (error) {
    res.status(400).json({ message: "Error" + error });
  }
};
