import mongoose from "mongoose";
import { Types } from "mongoose";

interface IField extends Document {
  label: string;
  type: string;
  required: boolean;
  options?: [string];
  logicJump?: {
    condition: string;
    value: string;
    goToField: string;
  };
}

interface IForm extends Document {
  title: string;
  description: string;
  slug: string;
  ownerId: Types.ObjectId;
  fields: IField[];
  status: String;
}

const fieldSchema = new mongoose.Schema<IField>({
  label: {
    type: String,
  },
  type: {
    type: String,
    enum: [
      "text",
      "email",
      "number",
      "date",
      "dropdown",
      "textarea",
      "radio",
      "checkbox",
    ],
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  options: {
    type: [String],
  },
  logicJump: {
    condition: {
      type: String,
    },
    value: {
      type: String,
    },
    goToField: {
      type: String,
    },
  },
});

const formSchema = new mongoose.Schema<IForm>(
  {
    title: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 30,
    },
    description: {
      type: String,
      maxLength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fields: {
      type: [fieldSchema],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);
const Form = mongoose.model<IForm>("Form", formSchema);
export default Form;
