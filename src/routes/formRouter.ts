import express from "express";
import {
  createFormController,
  deleteFormController,
  editFormController,
  editFormValidityController,
  getFormByIdController,
  getFormsController,
  publishFormController,
} from "../controllers/formController";
import { userAuth } from "../middlewares/userAuth";
const formRouter = express.Router();
formRouter.post("/createform", userAuth, createFormController);
formRouter.get("/getforms", userAuth, getFormsController);
formRouter.get("/getform/:formId", userAuth, getFormByIdController);
formRouter.patch("/editform/:formId", userAuth, editFormController);
formRouter.patch("/editvalidity/:formId", userAuth, editFormValidityController);
formRouter.delete("/deleteform/:formId", userAuth, deleteFormController);
formRouter.patch("/publishform/:formId", userAuth, publishFormController);

export default formRouter;
