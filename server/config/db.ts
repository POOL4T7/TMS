import mongoose from "mongoose";
import Common from "./common";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || Common.DB.URL);
    console.log("mongodb connected");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log("Mongodb Error: ", e.message);
  }
};

export default connectDB;
