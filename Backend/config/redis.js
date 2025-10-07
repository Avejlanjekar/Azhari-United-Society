const { createClient } = require("redis");

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-19953.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 19953
    }
});

module.exports = redisClient;