import mongoose from "mongoose";
import { ENV_CONFIG } from "./environmentVars";

export const connectDatabase = async() => {
  try{
    const isProd = process.env.NODE_ENV === 'production';
    const connectionString = isProd ? ENV_CONFIG.MONGODB_KEY : ENV_CONFIG.MONGODB_DEV_KEY;

    if(!connectionString){
      throw new Error("DB Connection String is missing.");
    }
  const connection = await mongoose.connect(connectionString);

    console.log(`Mongo DB Connected ${isProd ? 'on Prod' : 'on Dev'}`);
    return connection; 
  }catch(e){
    console.error(e);
    process.exit(1);
  }
}