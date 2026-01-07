import mongoose from "mongoose";

export const connectDatabase = async() => {
  try{
    const isProd = process.env.NODE_ENV === 'production';
    const connectionString = isProd ? process.env.MONGODB_KEY : process.env.MONGODB_DEVKEY;

    if(!connectionString){
      throw new Error("DB Connection String is missing.");
    }
  const connection = await mongoose.connect(connectionString, {
    serverSelectionTimeoutMS: 10000, // or higher
  });

    console.log(`Mongo DB Connected ${isProd ? 'on Prod' : 'on Dev'}`);
    return connection; 
  }catch(e){
    console.error(e);
    process.exit(1);
  }
}