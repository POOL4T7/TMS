import mongoose, { Schema, Types, Document } from "mongoose";

export interface ICompany  {
  _id?:Types.ObjectId;
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
    industry: [{
      type: Schema.Types.ObjectId,
      ref: "Industry",
      required: true,
    }],
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
    profile:{
      type:String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked", "suspended"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICompany>("Company", companySchema);
