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
  owner: Schema.Types.ObjectId | string | null;
  manager?: Schema.Types.ObjectId | string | null;
  teamLead?: Schema.Types.ObjectId | string | null;
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
