if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}
const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
app.use(cookieParser());
const redis = require("./src/config/redis/index.js");
const cloudinary = require("./src/config/cloudinary/index.js");
const { connectDB } = require("./src/config/mongodb/index.js");
const mainRouter = require("./src/router/index.js");
const serverless = require("serverless-http");

app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 26,
  message: {
    status: 429,
    error: "Too many requests, please try again after a minute.",
  },
});

app.use(cors({
  origin: process.env.WEB_ORIGIN,
  credentials: true
}))

app.get("/", (req, res) => {
  res.send("Server is running")
})

app.use(limiter)



app.use("/api", mainRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB().then(() => {
    redis.connect().then(() => {
    })
  })
})

module.exports = serverless(app);