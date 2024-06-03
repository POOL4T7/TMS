import app from './src/app';
import connectDB from './config/db';
import dotenv from 'dotenv';
import Logger from './src/helpers/Logger';
dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    const { PORT, NODE_ENV } = process.env;
    app.listen(PORT, () => {
      console.log(`server is listing in ${NODE_ENV} on ${PORT} `);
    });
  } catch (e: any) {
    Logger.error(e.message);
    process.exit(1);
  }
};

startServer();
