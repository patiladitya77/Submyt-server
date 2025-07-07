import express from "express";
import {
  createFormController,
  editFormController,
  getFormsController,
} from "../controllers/formController";
import { userAuth } from "../middlewares/userAuth";
const formRouter = express.Router();
formRouter.post("/createform", userAuth, createFormController);
formRouter.get("/getforms", userAuth, getFormsController);
formRouter.patch("/editform/:formId", userAuth, editFormController);

export default formRouter;
