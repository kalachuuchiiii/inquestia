const { createClient } = require("redis");


const redis = createClient({
  url: process.env.REDIS_KEY
})

redis.on("connect", () => {
  console.log("Redis DB Connected");
  return true;
})

redis.on("error", () => {
  console.error("Redis connection failed"); 
  throw new Error("err")
})

module.exports = redis;