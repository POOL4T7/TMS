import { Schema } from "mongoose";

interface ProjectTeam {
  departmentId: Schema.Types.ObjectId | string;
  userId: Schema.Types.ObjectId | string;
}

export interface IProject {
  name: string;
  slug: string;
  description: string;
  shortBio?: string;
  image: string;
  owner: Schema.Types.ObjectId | string;
  manager?: Schema.Types.ObjectId | string;
  teamLead?: Schema.Types.ObjectId;
  team: ProjectTeam[];
  status: "draft" | "publish" | "deleted";
  startDate: Date;
  endDate?: Date;
  techStack: string[];
}

export interface ProjectStats {
  projectList: IProject[];
  totalProject: number;
}
