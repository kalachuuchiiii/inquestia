import mongoose from "mongoose";
import { ENV_CONFIG } from "./env";
import logger from "./logger";

export const connectDatabase = async () => {
  try {
    const connectionString = ENV_CONFIG.MONGODB_KEY;
    if (!connectionString) {
      logger.error(
        "DB Connection String is missing.",
        new Error("Database connection failed")
      );
    }
    const connection = await mongoose.connect(connectionString);

    logger.info(`Mongo DB Connected`);
    return connection;
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};
