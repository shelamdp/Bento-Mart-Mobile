const Redis = require("ioredis")

const redis = new Redis({
    port: 10235,
    host: "redis-10235.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
    password: process.env.PASSWORD,
    db: 0,
});

module.exports = redis