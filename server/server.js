require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express(); 
const redis = require("./src/config/redis/index.js");
const cookieParser = require("cookie-parser");
const mainRouter = require("./src/router/index.js");
const { connectDB } = require("./src/config/mongodb/index.js");

app.use(express.json());
app.use(cors({
  origin: process.env.WEB_ORIGIN,
  credentials: true
}))
app.use(cookieParser());

app.use("/api", mainRouter);

const port = 5000;

connectDB().then(() => {
  redis.connect().then(() => {
  app.listen(port, () => {
    console.log(`listening at port ${port}`);
  })
})
})

module.exports = app;