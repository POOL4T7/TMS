import Industry from './models/Industry.model';
import Data from './utils/Data';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Logger from './helpers/Logger';
dotenv.config({ path: '../.env' });

async function main() {
  try {
    const MONGO_URI =
      process.env.MONGO_URI ||
      'mongodb://root:rootpassword@mongodb_server:27017/tms?authSource=admin';
    await mongoose.connect(MONGO_URI);
    Logger.info('Connected to the database successfully');

    await addIndustryListToDB();
    Logger.info('Data added successfully');
  } catch (error: any) {
    Logger.error(error.message);
    process.exit(1);
  } finally {
    mongoose.disconnect();
    Logger.warn('Disconnected from the database');
    process.exit(0);
  }
}

async function addIndustryListToDB() {
  try {
    await Industry.insertMany(Data.IndustryList, {
      ordered: false,
    });
    Logger.info('Data inserted successfully:');
  } catch (error: any) {
    if (error.code === 11000) {
      Logger.error(`'Duplicate key error:', ${error.message}`);
    } else {
      throw error;
    }
  }
}

main();
