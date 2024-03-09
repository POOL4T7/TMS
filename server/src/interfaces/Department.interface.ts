import { Schema } from "mongoose";

interface IDepartment {
  name: string;
  slug: string;
  createdBy: string;
  companyId: Schema.Types.ObjectId;
  status: "active" | "inactive" | "deleted";
}

export interface UpdateFormData {
  name?: string;
  slug?: string;
  image?: string;
  status?: string;
}

export default IDepartment;
