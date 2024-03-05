import { Schema } from "mongoose";

interface ProjectTeam {
  departmentId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

export interface IProject {
  name: string;
  slug: string;
  description: string;
  shortBio?: string;
  image: string;
  owner: Schema.Types.ObjectId;
  manager?: Schema.Types.ObjectId;
  teamLead?: Schema.Types.ObjectId[];
  team: ProjectTeam[];
  status: "draft" | "publish" | "deleted";
  startDate: Date;
  endDate?: Date;
  techStack: string[];
}
