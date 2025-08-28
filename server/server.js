if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(cookieParser());
const redis = require("./src/config/redis/index.js");
const cloudinary = require("./src/config/cloudinary/index.js");
const { connectDB } = require("./src/config/mongodb/index.js");
const mainRouter = require("./src/router/index.js");
const serverless = require("serverless-http");

app.use(express.json());
app.use(cors({
  origin: process.env.WEB_ORIGIN,
  credentials: true
}))

app.get("/", (req, res) => {
  res.send("Server is running")
})

app.use("/api", mainRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB().then(() => {
    redis.connect().then(() => {
    })
  })
})

module.exports = serverless(app);