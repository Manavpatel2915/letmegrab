import type { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/database/redis.connect.js";

export const getCachedData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authenticatedUser = req.user;

    if (!authenticatedUser) {
      return next();
    }

    const route = (req.originalUrl.split("?")[0] || "").replace(/\//g, ":");
    const queryString = JSON.stringify(req.query);

    const cacheKey = `user:${authenticatedUser.id}${route}:q:${queryString}`;

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        message: "data get form cached ",
        ...JSON.parse(cachedData)
      });
    }
    
    req.rediskey = cacheKey;
    next();
  } catch (error) {
    console.error("Redis error:", error);
    next();
  }
};
