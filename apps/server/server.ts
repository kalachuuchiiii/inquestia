import { ENV_CONFIG } from "@/config/env";
import express, { type Application, type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDatabase } from "@/config/connectDatabase";
import { mainRouter } from "./src/router";
import { errorHandler } from "@/utils/errorHandler";
import logger from "@/config/logger";

declare global {
  namespace Express {
    interface Request {
      myId?: string;
      accessToken?: string;
    }
  }
}

const app: Express = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.WEB_ORIGIN,
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use("/api", mainRouter);
app.use(errorHandler);

app.get("/", (_, res) => {
  res.send("Server is running");
});

const PORT = Number(process.env.PORT || "5000") || 5000;

connectDatabase();

app.listen(PORT, "0.0.0.0", async () => {
  try {
    logger.info(`Server running on port ${PORT}`);
  } catch (err) {
    logger.error("❌ Failed to start services:", err);
    process.exit(1);
  }
});

export default app;
