const Redis = require("ioredis");

const redis = new Redis({
  host: "127.0.0.1",   // or your Redis host
  port: 6379,     
  user: '',     // port
  password: "mypassword", // if your Redis requires auth
  db: 0,               // optional, default DB index
});

module.exports = redis;
