import mongoose, { Document, Schema, Types } from "mongoose";
import BcryptJs from "bcryptjs";

export interface ICompany extends Document {
  _id?: Types.ObjectId;
  name: string;
  industry: Types.ObjectId[];
  email: string;
  phone?: string;
  password?: string;
  status: string;
  profile?: string;
}

const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    industry: [
      {
        type: Schema.Types.ObjectId,
        ref: "Industry",
        required: true,
      },
    ],
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked", "suspended"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

companySchema.pre<ICompany>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await BcryptJs.genSalt(10);
    const hash = await BcryptJs.hash(this.password || "", salt);
    this.password = hash;
    next();
  } catch (error: any) {
    return next(error);
  }
});

export default mongoose.model<ICompany>("Company", companySchema);
