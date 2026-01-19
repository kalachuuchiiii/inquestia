import { createClient } from "redis";
import { ENV_CONFIG } from "./environmentVars";

const redis = createClient({
    url: ENV_CONFIG.REDIS_KEY
})

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redis;

