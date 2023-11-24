const redisDB = require('redis');
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on('connect' , () => console.log("Connected to redis"))
redisClient.on('ready' , () => console.log("Redis is ready to use ...."))
redisClient.on('error' , (err) => console.log("Redis error : " + err.message))
redisClient.on('end' , () => console.log("Disconnected from redis"))


module.exports = redisClient