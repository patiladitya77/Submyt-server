import { Request, Response } from "express";
import Form from "../models/form";
import ResponseModel from "../models/Response";
export const submitFormController = async (req: Request, res: Response) => {
  try {
    const formId = req.params.formId;
    const { answers } = req.body;

    const form = await Form.findById(formId);
    if (!form) {
      res.status(400).json({ message: "Form not found" });
      return;
    }
    const response = new ResponseModel({
      formId: formId,
      answers: answers,
    });
    const savedResponse = await response.save();
    res.json({ message: "Your response has been recorded", savedResponse });
  } catch (error) {
    res.status(400).json({ message: "ERROR: ", error });
  }
};
