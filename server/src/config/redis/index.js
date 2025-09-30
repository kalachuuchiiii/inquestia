const { createClient } = require("redis");

const redis = createClient({
  url: process.env.REDIS_KEY,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error("❌ Too many Redis reconnection attempts. Stopping...");
        return new Error("Redis reconnect failed");
      }
      console.warn(`⚠️ Redis reconnect attempt #${retries}`);
      return Math.min(retries * 200, 3000); // backoff in ms
    },
  },
});

redis.on("connect", () => {
  console.log("✅ Redis DB Connected");
});

redis.on("ready", () => {
  console.log("🎉 Redis is ready to use");
});

redis.on("end", () => {
  console.warn("⚠️ Redis connection closed");
});

redis.on("reconnecting", () => {
  console.log("🔄 Attempting to reconnect to Redis...");
});

redis.on("error", (err) => {
  console.error("🚨 Redis connection error:", err.message);
});

module.exports = redis;
