import mongoose, { Schema } from "mongoose";

interface ProjectTeam {
  departmentId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

interface IProject {
  name: string;
  slug: string;
  description: string;
  image: string;
  owner: Schema.Types.ObjectId;
  manager?: Schema.Types.ObjectId | null;
  teamLead?: Schema.Types.ObjectId | null;
  team: ProjectTeam[];
  status: "draft" | "publish" | "deleted";
  startDate: Date;
  endDate?: Date;
  techStack: string[];
}

const projectSchema = new Schema<IProject>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    teamLead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team: [
      {
        departmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Department",
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    techStack: [String],
    status: {
      type: String,
      enum: ["draft", "publish", "deleted", ""],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
