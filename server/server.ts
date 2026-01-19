import { ENV_CONFIG } from "@/config/environmentVars";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDatabase } from "@/config/connectDatabase";
import { mainRouter } from "@/router";
import { errorHandler } from "@/utils/errorHandler";
import redis from "@/config/redis";
import Survey from "@/models/survey/survey";


declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.WEB_ORIGIN,
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use('/api', mainRouter);
app.use(errorHandler);

app.get("/", (_, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;

connectDatabase().then(async () => {
  // Run migration to rename 'user'/'userId' fields to 'authorId'
  try {
    const result = await Survey.updateMany(
      { $or: [{ user: { $exists: true } }, { userId: { $exists: true } }] },
      { $rename: { user: "authorId", userId: "authorId" } },
      { multi: true }
    );
    if (result.modifiedCount > 0) {
      console.log(`✅ Migrated ${result.modifiedCount} survey documents: user/userId → authorId`);
    }
  } catch (err) {
    console.error("⚠️ Survey migration warning:", err);
  }

  await redis.connect();
});

app.listen(PORT, async () => {
  try {
    console.log(`✅ Server running on port ${PORT}`);
  } catch (err) {
    console.error("❌ Failed to start services:", err);
    process.exit(1);
  }
});

export default app;