import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express, { RequestHandler } from 'express';
import cors from 'cors';
import rateLimit from "express-rate-limit";
import cookieParser from 'cookie-parser';
import { connectDatabase } from '@/config/connectDatabase';

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
  windowMs: 60 * 1000, 
  max: 20,
  message: "Too many write requests, please try again later.",
});

const methodLimiter: RequestHandler = (req, res, next) => {
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


const PORT = process.env.PORT || 5000; 

connectDatabase().then(async() => {

})


app.listen(PORT, async () => {
  try {
   
    console.log(`✅ Server running on port ${PORT}`);
  } catch (err) {
    console.error("❌ Failed to start services:", err);
    process.exit(1);
  }
});

module.exports = app;