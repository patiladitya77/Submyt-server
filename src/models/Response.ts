import mongoose, { Types } from "mongoose";
interface IFormAnswer extends Document {
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
        answer: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Response = mongoose.model("Response", responseSchema);
export default Response;
