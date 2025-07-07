import express from "express";
import {
  createFormController,
  getFormsController,
} from "../controllers/formController";
import { userAuth } from "../middlewares/userAuth";
const formRouter = express.Router();
formRouter.post("/createform", userAuth, createFormController);
formRouter.get("/getforms", userAuth, getFormsController);

export default formRouter;
