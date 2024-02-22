import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  email: string;
  password: string;
  role: "manager" | "admin" | "employee";
  firstName: string;
  lastName?: string;
  profilePicture?: string;
  employeeId?: string;
  departmentId?: Schema.Types.ObjectId | null;
  positionId?: Schema.Types.ObjectId | null;
  companyId?: Schema.Types.ObjectId | null;
  hireDate?: Date;
  qualification?: string[];
  status: "active" | "inactive" | "deleted" | "suspended";
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["manager", "admin", "employee"],
      default: "employee",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    employeeId: {
      type: String,
      unique: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    positionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position",
      default: null,
    },
    qualification: {
      type: [String],
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive", "deleted", "suspended"],
    },
    hireDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
