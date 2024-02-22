import { Schema } from "mongoose";

interface IPosition {
  name: string;
  slug: string;
  createdBy: string;
  companyId: Schema.Types.ObjectId;
  status: "active" | "inactive" | "deleted";
}

export default IPosition;
