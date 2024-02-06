import { Schema, Types, model, ObjectId } from "mongoose";

export interface IDepartment {
  name: string;
  slug: string;
  companyId: Types.ObjectId;
  status: "active" | "inactive" | "deleted";
  image?: string;
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "inactive",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IDepartment>("Department", departmentSchema);
