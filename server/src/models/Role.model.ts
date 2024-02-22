import mongoose, { Schema } from "mongoose";

export interface IRole {
  name: string;
  description: string;
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Role = mongoose.model<IRole>("Role", roleSchema);

export default Role;
