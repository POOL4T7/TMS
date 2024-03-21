import Industry from "./models/Industry.model";
import Data from "./utils/Data";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

async function main() {
  try {
    const MONGO_URI =
      process.env.MONGO_URI ||
      "mongodb://root:rootpassword@mongodb_server:27017/tms?authSource=admin";
    await mongoose.connect(MONGO_URI);
    console.log("Connected to the database successfully");

    await addIndustryListToDB();
    console.log("Data added successfully");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from the database");
    process.exit(0);
  }
}

async function addIndustryListToDB() {
  try {
    await Industry.insertMany(Data.IndustryList, {
      ordered: false,
    });
    console.log("Data inserted successfully:");
  } catch (error: any) {
    if (error.code === 11000) {
      console.error("Duplicate key error:", error);
    } else {
      throw error;
    }
  }
}

main();
