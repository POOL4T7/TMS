import mongoose, { Document, Query, Schema } from "mongoose";
import BcryptJs from "bcryptjs";

export interface IUser extends Document {
  isModified: any;
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
  companyId?: Schema.Types.ObjectId | string;
  hireDate?: Date;
  qualification?: string[];
  status: "active" | "inactive" | "deleted" | "suspended";
  updatePassword(newPassword: string): Promise<boolean>;
  // change --------------
  resetToken?: string; 
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
      enum: ["manager", "admin", "employee", "teamlead"],
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
      required: true,
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
    // change --------------
    resetToken: {
      type: String,
      default: undefined,
    }
    // --------------------
  },
  { timestamps: true },
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await BcryptJs.genSalt(10);
    const hash = await BcryptJs.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error: any) {
    return next(error);
  }
});

userSchema.pre<IUser>("findOneAndUpdate", async function (next) {
  const query: Query<IUser | null, IUser> = this as unknown as Query<
    IUser | null,
    IUser
  >;
  const update = query.getUpdate() as any;
  if (!update || !update.password) return next();
  try {
    const salt = await BcryptJs.genSalt(10);
    const hash = await BcryptJs.hash(update.$set.password, salt);
    await query.updateOne({ $set: { password: hash } });
    next();
  } catch (error: any) {
    return next(error);
  }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
