import { Schema, Model, model, QueryWithHelpers, UpdateQuery } from "mongoose";

interface IPosition {
  name: string;
  slug: string;
  createdBy: string;
  teamId: Schema.Types.ObjectId;
  companyId: Schema.Types.ObjectId;
  status: "active" | "inactive" | "deleted";
}

const positionSchema: Schema = new Schema<IPosition>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    teamId: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

positionSchema.pre("findOneAndUpdate", checkForUser);
positionSchema.pre("save", checkForUser); // for creating the new position
positionSchema.pre("findOneAndDelete", checkForUser);

async function checkForUser(
  this: QueryWithHelpers<IPosition, Document>,
  next: any
) {
  try {
    console.log("i'm here");
    const updatedData = this.getUpdate() as UpdateQuery<IPosition>;
    if (updatedData?.$set && updatedData?.$set.status === "inactive") {
      const usersWithActivePosition = await model("User").findOne({
        positionId: this.getQuery()._id,
      });

      if (usersWithActivePosition) {
        const error = new Error(
          "Cannot change position status to inactive. Users have this position with an active status."
        );
        return next(error);
      }
    }

    next();
  } catch (e: any) {
    console.log(e);
    throw Error(e);
  }
}

const Position: Model<IPosition> = model<IPosition>("Position", positionSchema);

export default Position;
