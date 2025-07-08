import express from "express";
import { submitFormController } from "../controllers/submitController";

const submitRouter = express.Router();
submitRouter.post("/submitform/:formId", submitFormController);

export default submitRouter;
