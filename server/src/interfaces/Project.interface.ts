import { Schema } from "mongoose";

export interface IProject {
  name: string;
  slug: string;
  description: string;
  shortBio?: string;
  image: string;
  owner: Schema.Types.ObjectId;
  manager?: Schema.Types.ObjectId;
  teamLead?: Schema.Types.ObjectId[];
  team: Schema.Types.ObjectId[];
  status: "draft" | "publish" | "deleted";
  startDate: Date;
  endDate?: Date;
  techStack: string[];
}
