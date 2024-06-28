import mongoose from 'mongoose';
import Common from './common';
import Logger from '../src/helpers/Logger';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || Common.DB.URL);
    Logger.info('mongodb connected');
  } catch (e: any) {
    Logger.error('Mongodb Error: ', e.message);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (e: any) {
    Logger.error('Mongodb Error: ', e.message);
  }
};

export default connectDB;
