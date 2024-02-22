import { Schema } from "mongoose";

interface IDepartment {
  name: string;
  slug: string;
  createdBy: string;
  companyId: Schema.Types.ObjectId;
  status: "active" | "inactive" | "deleted";
}

export default IDepartment;
