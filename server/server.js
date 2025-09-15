require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const redis = require("./src/config/redis/index.js");
const { connectDB } = require("./src/config/mongodb/index.js");
const mainRouter = require("./src/router/index.js");
const { requestTracker } = require("./src/middlewares/tracker/requestTracker.js");
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: process.env.WEB_ORIGIN,
  credentials: true,
}));
app.set("trust proxy", 1);
const getLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 80,
  message: "Too many GET requests, please slow down.",
});

const writeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: "Too many write requests, please try again later.",
});

const methodLimiter = (req, res, next) => {
  if (req.method === "GET") {
    return getLimiter(req, res, next);
  }
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return writeLimiter(req, res, next);
  }
  next();
};

app.use(methodLimiter);

app.get("/", (req, res) => {
  res.send("Server is running")
});

app.use(requestTracker)


app.use("/api", mainRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    await redis.connect();
    console.log(`✅ Server running on port ${PORT}`);
  } catch (err) {
    console.error("❌ Failed to start services:", err);
  }
});

module.exports = app;