import mongoose, { Types } from "mongoose";
interface IFormAnswer extends Document {
  fieldType: string;
  fieldId: string;
  answer: string | number | string[] | boolean | null;
}

interface IResponse extends Document {
  formId: Types.ObjectId;
  answers: [IFormAnswer];
}
const responseSchema = new mongoose.Schema<IResponse>(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    answers: [
      {
        fieldName: String,
        fieldType: String,
        answer: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ResponseModel = mongoose.model("ResponseModel", responseSchema);
export default ResponseModel;
