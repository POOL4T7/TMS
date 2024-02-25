import { Schema } from "mongoose";

export interface IPosition {
  name: string;
  slug: string;
  createdBy: string;
  companyId: string | Schema.Types.ObjectId;
  teamId: string | Schema.Types.ObjectId;
  status: "active" | "inactive" | "deleted";
}

// export default IPosition;
