import { createClient } from "redis";
import { env } from "../env.config.js";

export const redisClient = createClient({
    password: env.REDIS.PASSWORD,
    socket: {
        host: env.REDIS.HOST,
        port: env.REDIS.PORT
    }
});

redisClient.on("error", (error) => console.error(error));

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("redis connected");
    } catch (error) {
        console.error("during connection some error accour", error);
    }
};

export const clearCachePattern = async (pattern: string) => {
    try {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
    } catch (error) {
        console.error("some error accour dunring chache clear", error);
    }
};
