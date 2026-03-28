import mongoose from "mongoose";
import { ENV_CONFIG } from "./env";
import logger from "./logger";

export const connectDatabase = async() => {
  try{
    const isProd = process.env.NODE_ENV === 'production';
    const connectionString = isProd ? ENV_CONFIG.MONGODB_KEY : ENV_CONFIG.MONGODB_DEV_KEY;

    if(!connectionString){
      logger.error("DB Connection String is missing.", new Error('Database connection failed'));
    }
  const connection = await mongoose.connect( ENV_CONFIG.MONGODB_KEY);

  logger.info(`Mongo DB Connected ${isProd ? 'on Prod' : 'on Dev'}`);
    return connection; 
  }catch(e){
    logger.error(e);
    process.exit(1);
  }
}